<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvestmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get("/investments", [InvestmentController::class, 'index']);
Route::get("/investments/{id}", [InvestmentController::class, 'show']);
Route::get("/investments/search/{title}", [InvestmentController::class, 'search']);

// Private Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("/investments", [InvestmentController::class, 'store']);
    Route::put("/investments/{id}", [InvestmentController::class, 'update']);
    Route::delete("/investments/{id}", [InvestmentController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/get-user', [AuthController::class, 'getuser']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
