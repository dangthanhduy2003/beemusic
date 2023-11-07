<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album_music extends Model
{
    protected $table = 'album_music';

    protected $primaryKey = array('id_album', 'id_music');

    public $incrementing = false;

    public function music()
    {
        return $this->belongsTo(Music::class, 'id_music', 'id');
    }

    public function album()
    {
        return $this->belongsTo(Categories::class, 'id_categories', 'id');
    }
}
