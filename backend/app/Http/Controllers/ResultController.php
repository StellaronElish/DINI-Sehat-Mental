<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;

class ResultController extends Controller
{
    public function show($respondentId)
    {
        // Ambil result berdasarkan respondent_id + sertai data respondent
        $result = Result::with('respondent')->where('respondent_id', $respondentId)->first();

        if (!$result) {
            return response()->json(['message' => 'Result not found'], 404);
        }

        return response()->json([
            'name' => $result->respondent->name,
            'age' => $result->respondent->age,
            'status' => $result->respondent->status,
            'score_total' => $result->score_total,
            'problematic_category' => $result->problematic_category,
            'stress_level' => $result->stress_level,
        ]);
    }
}
