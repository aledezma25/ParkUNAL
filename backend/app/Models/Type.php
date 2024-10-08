<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Vehicle;

class Type extends Model
{
    use HasFactory;
    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'idTypes', 'id');
    }
}
