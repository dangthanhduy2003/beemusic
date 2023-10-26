<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $table='album';
    protected $primarykey ='id';
    protected $fillable = [
     'name_album',
     'year',
     'id_user ',
    ];
}
