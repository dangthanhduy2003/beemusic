<?php

namespace App\Models;
use Illuminate\Foundation\Auth\Categories as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
class Categories extends Model
{

   protected $table='categories';
   protected $primarykey ='id';
   protected $fillable = [
    'name',
    'avatar',
   
   ];
   use Searchable;
}
