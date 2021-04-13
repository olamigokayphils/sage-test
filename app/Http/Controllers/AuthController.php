<?php

namespace App\Http\Controllers;

use App\Models\User;
use Config;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $body = $request->validate([
            "name" => "required|string",
            "email" => "required|string|unique:users,email",
            "password" => "required|string|confirmed",
        ]);

        $user = User::create([
            "name" => $body["name"],
            "email" => $body["email"],
            "password" => bcrypt($body["password"]),
        ]);

        $token = $user->createToken(Config::get('app.app_auth_token'))->plainTextToken;

        $response = [
            "user" => $user,
            "token" => $token,
        ];
        return response($response, 201);

    }

    public function login(Request $request)
    {
        $body = $request->validate([
            "email" => "required|string",
            "password" => "required|string",
        ]);

        // Get User
        $user = User::where("email", $body["email"])->first();

        // Check Password
        if (!$user || !Hash::check($body["password"], $user->password)) {
            // Bad Credentials
            return response([
                "message" => "Invalid username/password",
            ], 401);

        }

        $token = $user->createToken(Config::get('app.app_auth_token'))->plainTextToken;

        $response = [
            "user" => $user,
            "token" => $token,
        ];
        return response($response, 201);

    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Successfully logged out',
        ];
    }

}
