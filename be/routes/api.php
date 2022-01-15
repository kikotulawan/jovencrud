<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

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

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function () {
    Route::group(['prefix' => 'user'], function (){
        Route::post('login', [UserController::class, 'login']);
        Route::post('store', [UserController::class, 'store']);
        Route::post('me', [UserController::class, 'me']);
        Route::post('logout', [UserController::class, 'logout']);
        Route::post('storeUser', [UserController::class, 'storeUser']);
        Route::post('storeTask', [UserController::class, 'storeTask']);
        Route::get('getTask', [UserController::class, 'getTask']);
        Route::put('update/{id}', [UserController::class, 'updateTask']);
        Route::put('complete/{id}', [UserController::class, 'completeTask']);
        Route::put('redo/{id}', [UserController::class, 'redoTask']);
        Route::delete('delete/{id}', [UserController::class, 'deleteTask']);
    });
});
