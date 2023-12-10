<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music_home extends Model
{
    protected $table = 'music_home';

    protected $primaryKey = array('id_music', 'id_home');

    public $incrementing = false;

    public function music()
    {
        return $this->belongsTo(Music::class, 'id_music', 'id');
    }

    public function home()
    {
        return $this->belongsTo(Categories::class, 'id_home', 'id');
    }
}
