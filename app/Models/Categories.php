<?php

namespace App\Models;
use Illuminate\Foundation\Auth\Categories as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Categories extends Model
{

   protected $table='categories';
   protected $primarykey ='id';
   protected $fillable = [
    'name',
    'avatar',
   
   ];

}
