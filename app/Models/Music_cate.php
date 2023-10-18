<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music_cate extends Model
{
    protected $table = 'music_cate';

    protected $primaryKey = array('id_music', 'id_categories');

    public $incrementing = false;
}
