<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'role_id' => 1,
                'name' => 'Adrian Admin',
                'last_name' => 'Ledezma',
                'document_number' => '1004710780',
                'address' => 'Manizales, Caldas',
                'phone_number' => '3167383112',
                'email' => 'aledezma@unal.edu.co',
                'password' => Hash::make('aledezma'), // Hasheando la contraseña
            ],
            [
                'role_id' => 1,
                'name' => 'Albeiro',
                'last_name' => 'Montes',
                'document_number' => '',
                'address' => 'Manizales, Caldas',
                'phone_number' => '',
                'email' => 'joamontesgi@unal.edu.co',
                'password' => Hash::make('joamontesgi'), // Hasheando la contraseña
            ],
            [
                'role_id' => 1,
                'name' => 'Valentina',
                'last_name' => 'Tabares',
                'document_number' => '',
                'address' => 'Manizales, Caldas',
                'phone_number' => '',
                'email' => 'vtabaresm@unal.edu.co',
                'password' => Hash::make('vtabaresm'), // Hasheando la contraseña
            ]
        ]);
    }
}
