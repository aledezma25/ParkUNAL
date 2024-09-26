<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('comments')->insert([
            [
                'id' => 1,
                'idUser' => 1,
                'nameUser' => 'Juan',
                'lastNameUser' => 'Gonzales',
                'photoURL' => 'users/icons/image1.jpg',
                'message' => 'El parcero que dejó las llaves en la moto, que me escriba pa devolverselas',
                'image' => 'comments/images/image1.jpg',
                'reaction' => '1',
                'created_at' => Carbon::create(2024, 8, 26, 8, 30, 0),
            ],
            [
                'id' => 2,
                'idUser' => 1,
                'nameUser' => 'Ana',
                'lastNameUser' => 'Gómez',
                'photoURL' => 'users/icons/image2.jpg',
                'message' => 'Encontré éstas llaves, las dejé en portería',
                'image' => 'comments/images/image2.jpg',
                'reaction' => '3',
                'created_at' => Carbon::create(2024, 8, 26, 8, 35, 0),
            ],
            [
                'id' => 3,
                'idUser' => 1.,
                'nameUser' => 'Luis',
                'lastNameUser' => 'Martínez',
                'photoURL' => 'users/icons/image3.jpg',
                'message' => 'Casco olvidado en el P207',
                'image' => 'comments/images/image3.jpg',
                'reaction' => '8',
                'created_at' => Carbon::create(2024, 8, 26, 8, 40, 0),
            ],
            [
                'id' => 4,
                'idUser' => 1,
                'nameUser' => 'María',
                'lastNameUser' => 'Hernández',
                'photoURL' => 'users/icons/image4.jpg',
                'message' => 'Dejaron las estacionarias prendidas',
                'image' => 'comments/images/image4.jpg',
                'reaction' => '3',
                'created_at' => Carbon::create(2024, 8, 26, 8, 45, 0),
            ],
        ]);
    }
}
