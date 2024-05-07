<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Type;

class Vehicle extends Model
{
    use HasFactory;

    public function type()
    {
        return $this->belongsTo(Type::class, 'idTypes', 'id');
    }
}
