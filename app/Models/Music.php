<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Music extends Model
{
    protected $table = 'music';
    protected $primarykey = 'id';
    protected $fillable = [
        'name',
        'link_file',
        'thumbnail',
        'view',
        'lyrics',
        'id_user',
        'artist',
        'time',
    ];

    public function musicCates()
    {
        return $this->hasMany(Music_cate::class, 'id_music', 'id');
    }

    public function musicArtist()
    {
        return $this->hasMany(User::class, 'id', 'id_user');
    }
    public function artist()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

}
