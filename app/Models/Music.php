<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table='music';
    protected $primarykey ='id';
    protected $fillable = [
     'name',
     'link_file',
     'thumbnail',
     'view',
     'lyrics',
     'id_user',
    ];
}
