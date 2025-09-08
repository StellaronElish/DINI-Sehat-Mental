<?php

// ResultController.php
namespace App\Http\Controllers;

use App\Models\Respondent;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function show($respondentId) 
    {
        $respondent = Respondent::with('results')->find($respondentId);
        
        if (!$respondent) {
            return response()->json(['error' => 'Respondent not found'], 404);
        }

        $latestResult = $respondent->results()->latest()->first();
        
        if (!$latestResult) {
            return response()->json(['error' => 'No results found'], 404);
        }

        return response()->json([
            'name' => $respondent->name,
            'age' => $respondent->age, 
            'status' => $respondent->status,
            'score_total' => $latestResult->score_total,
            'problematic_category' => $latestResult->problematic_category,
            'stress_level' => $latestResult->stress_level,
            'wfc_index' => $latestResult->wfc_index,
            'stress_index' => $latestResult->stress_index,
            'score_category' => $latestResult->score_category,
            'score_details' => $latestResult->score_details,
        ]);
    }
}
