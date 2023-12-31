<?php

namespace App\Http\Controllers;

use App\Models\FavoriteSong;
use App\Models\Music;
use App\Models\Lyrics;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            // Lấy thông tin bài hát từ bảng music
            $musicInfo = Music::select('name', 'thumbnail', 'artist')->find($songId);

            $favoriteSong = new FavoriteSong([
                'user_id' => $userId,
                'song_id' => $songId,
                'song_name' => $musicInfo->name,
                'song_thumbnail' => $musicInfo->thumbnail,
                'song_artist' => $musicInfo->artist,
            ]);

            $favoriteSong->save();

            return response()->json(['message' => 'Bài hát đã được thêm vào danh sách yêu thích.']);
        }

        return response()->json(['message' => 'Bài hát đã tồn tại trong danh sách yêu thích.']);
    }

    public function listFavoriteSongs()
    {
        $userId = auth()->user()->id;

        $favoriteSongs = FavoriteSong::where('user_id', $userId)
            ->with('song')
            ->orderBy('created_at', 'desc')
            ->get();
        // Tạo một mảng chứa id của từng bài hát trong danh sách yêu thích
        $songIds = $favoriteSongs->pluck('song.id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $songIds)->get();
        return Inertia::render('Client/FavoriteSongs', ['favoriteSongs' => $favoriteSongs, 'lyrics' => $lyrics]);
    }

    public function FavoriteSongs()
    {
        $userId = auth()->user()->id;

        $favoriteSongs = FavoriteSong::where('user_id', $userId)
            ->with('song')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['favoriteSongs' => $favoriteSongs]);
    }

    public function deleteFavoriteSong($id)
    {
        $favoriteSong = FavoriteSong::find($id);

        if ($favoriteSong) {
            $favoriteSong->delete();
            return response()->json(['message' => 'Bài hát đã được xóa khỏi danh sách yêu thích.']);
        }

        return response()->json(['message' => 'Không tìm thấy bài hát trong danh sách yêu thích.'], 404);
    }
}
