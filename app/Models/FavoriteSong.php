<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteSong extends Model
{
    protected $table = 'favorite_songs';

    protected $fillable = ['user_id', 'song_id'];

    public function song()
    {
        return $this->belongsTo(Music::class, 'song_id');
    }
}
