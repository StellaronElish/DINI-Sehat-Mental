<?php

namespace App\Http\Controllers;

use App\Models\Respondent;
use App\Models\Result;
use Illuminate\Http\Request;

class RespondentController extends Controller
{
    public function store(Request $request)
    {
        
    $respondentData = $request->validate([
        'name'   => 'required|string|max:100',
        'age'    => 'required|integer|min:18',
        'status' => 'required|string|max:50',
    ]);

    $resultData = $request->validate([
        'score_I' => 'nullable|integer',
        'score_II' => 'nullable|integer',
        'score_III' => 'nullable|integer',
        'score_IV' => 'nullable|integer',
        'score_V' => 'nullable|integer',
        'score_VI' => 'nullable|integer',
        'score_VII' => 'nullable|integer',
        'score_VIII' => 'nullable|integer',
        'score_IX' => 'nullable|integer',
        'problematic_category' => 'nullable|integer',
        'score_total' => 'nullable|integer',
        'stress_level' => 'nullable|string|in:rendah,sedang,tinggi',
    ]);

    // cari respondent berdasarkan nama/usia/status
    $respondent = Respondent::firstOrCreate($respondentData);

    // simpan result baru untuk respondent tsb
    $result = $respondent->results()->create($resultData);

    return response()->json([
        'respondent' => $respondent,
        'result' => $result
    ], 201);
    }
}

