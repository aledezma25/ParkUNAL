<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('types')->insert([
            [
                'name' => 'Carro',
                'image' => 'imagenes/types/carro.jpg',
                'description' => 'Camionetas, Eléctricos, Deportivos, Clásicos, etc.',
                'spaces' => 70,
            ],
            [
                'name' => 'Moto',
                'image' => 'imagenes/types/moto.jpg',
                'description' => 'Deportivas, Clásicas, Chopper, etc.',
                'spaces' => 200,
            ],
            [
                'name' => 'Bicicleta',
                'image' => 'imagenes/types/bici.jpg',
                'description' => 'De montaña, De ruta, Eléctricas, Urbanas, Monopatín, Scooter, etc.',
                'spaces' => 50,
            ],
        ]);
    }
}
