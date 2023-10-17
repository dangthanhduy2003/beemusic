<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class role extends Model
{
   protected $table='role';
   protected $primarykey ='id';
   protected $fillable = [
    'name_role',
    'short_role',
   ];
}
