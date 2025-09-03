<?php

// app/Http/Controllers/ResultController.php
namespace App\Http\Controllers;

use App\Models\Result;

class DashboardController extends Controller
{
    public function index()
    {
        $results = Result::with('respondent')->latest()->get();

        return response()->json($results);
    }
}
