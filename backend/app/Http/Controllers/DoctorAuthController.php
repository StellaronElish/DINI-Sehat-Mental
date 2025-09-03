<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;
use Illuminate\Support\Facades\Hash;

class DoctorAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $doctor = Doctor::where('username', $request->username)->first();

        if (!$doctor || !Hash::check($request->password, $doctor->password)) {
            return response()->json(['success' => false, 'message' => 'Login gagal'], 401);
        }

        // buat token baru
        $token = $doctor->createToken('doctor_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // hapus token yang sedang dipakai
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil, token dihapus',
        ]);
    }
}
