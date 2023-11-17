<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FavoriteSong;

class FavoriteSongController extends Controller
{
    public function addFavoriteSong(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated.'], 401);
        }

        $userId = $user->id;
        $songId = $request->input('song_id');

        $existingFavorite = FavoriteSong::where('user_id', $userId)
            ->where('song_id', $songId)
            ->first();

        if (!$existingFavorite) {
            $favoriteSong = new FavoriteSong([
                'user_id' => $userId,
                'song_id' => $songId,
            ]);

            $favoriteSong->save();

            return response()->json(['message' => 'Bài hát đã được thêm vào danh sách yêu thích.']);
        }

        return response()->json(['message' => 'Bài hát đã tồn tại trong danh sách yêu thích.']);
    }
    public function getFavoriteSongs()
    {
        $userId = auth()->user()->id;
        $favoriteSongs = FavoriteSong::where('user_id', $userId)->with('song')->get();

        return response()->json($favoriteSongs);
    }
}
