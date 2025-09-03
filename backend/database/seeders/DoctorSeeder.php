<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        Doctor::create([
            'name' => 'Dr. Tirta',
            'username' => 'WIR',
            'password' => Hash::make('admin123'),
        ]);
    }
}
