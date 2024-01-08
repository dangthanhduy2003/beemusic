<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class music_view extends Model
{
    protected $table='music_view';
    protected $primarykey ='id';
    protected $fillable = [
     'id_music',
     'view',
    ];
    public function music()
    {
        return $this->belongsTo(Music::class, 'id_music');
    }
}
