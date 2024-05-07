<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'idVehicle');
    }
}
