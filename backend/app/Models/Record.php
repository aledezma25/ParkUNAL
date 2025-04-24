<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $fillable = [
        'entryTime',
        'exitTime',
        'entryDate',
        'idUser',
        'idVehicle',
        'nameAdmin',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser', 'id');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'idVehicle', 'id');
    }
}
