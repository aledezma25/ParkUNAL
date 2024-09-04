<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'idUser',
        'nameUser',
        'lastNameUser',
        'photoURL',
        'message',
        'image',
        'reaction',
        'date',
    ];
}
