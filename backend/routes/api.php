<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RespondentController;
use App\Http\Controllers\DoctorAuthController;
use App\Http\Controllers\ResultController;
use Illuminate\Support\Facades\Route;

Route::post('/respondent', [RespondentController::class, 'store']);
Route::get('/results/{respondentId}', [ResultController::class, 'show']);
Route::post('/doctor/login', [DoctorAuthController::class, 'login']);
Route::get('/results', [DashboardController::class, 'index']);
Route::middleware('auth:sanctum')->post('/doctor/logout', [DoctorAuthController::class, 'logout']);

