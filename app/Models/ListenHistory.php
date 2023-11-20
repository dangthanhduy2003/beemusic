<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListenHistory extends Model
{
    use HasFactory;

    protected $table = 'listen_histories';

    protected $fillable = ['user_id', 'song_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function song()
    {
        return $this->belongsTo(Music::class);
    }
}
