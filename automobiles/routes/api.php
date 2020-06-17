<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * Automobile Types
 */
Route::get('automobile-types/{type}', 'AutomobileTypeController@show');
Route::post('automobile-types', 'AutomobileTypeController@store');

/**
 * Automobiles
 */
Route::get('automobiles/{license_plate}', 'AutomobileController@show');
Route::post('automobiles', 'AutomobileController@store');