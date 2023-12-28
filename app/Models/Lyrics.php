<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lyrics extends Model
{
    protected $table = 'lyrics';
    protected $primarykey = 'id';
    protected $fillable = [
        'id_music',
        'start_time',
        'end_time',
        'content',
    ];
}
