<?php

namespace App\Http\Controllers;

use App\Models\Investments;
use Illuminate\Http\Request;

class InvestmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Investments::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'amount' => 'required',
            'type' => 'required',
        ]);

        $newData = Investments::create($request->all());

        return [
            "message" => "Investment Creted Succesfully",
            "newRecord" => $newData,
            "data" => Investments::all(),
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Investments::find($id);
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $title
     * @return \Illuminate\Http\Response
     */
    public function search($title)
    {
        return Investments::where('title', 'LIKE', '%' . ucwords($title) . '%')->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $investmentInView = Investments::find($id);
        $investmentInView->update($request->all());

        return $investmentInView;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $investmentInView = Investments::destroy($id);

        return [
            "message" => "Investment Deleted Succesfully",
            "data" => Investments::all(),
        ];
    }
}
