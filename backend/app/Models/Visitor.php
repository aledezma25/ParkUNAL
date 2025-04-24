<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = [
        'name',
        'lastName',
        'documentNumber',
        'phone',
        'mark',
        'color',
        'typeVehicle',
        'plate',
        'entryDate',
        'exitDate',
    ];
}
