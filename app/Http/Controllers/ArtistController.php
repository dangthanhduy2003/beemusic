<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 4d74403 (cmf)
=======
>>>>>>> edf87ce (cmft)
=======
>>>>>>> main
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Music;
use App\Models\Album;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Auth;



Paginator::useBootstrap();

class ArtistController extends Controller
{
    public function getTopViewedUsers()
    {
        $topUsers = DB::table('music')
            ->select('users.id', 'users.name', DB::raw('SUM(music.view) as total_view'))
            ->join('users', 'users.id', '=', 'music.id_user')
            ->groupBy('users.id', 'users.name')
            ->orderByDesc('total_view')
            ->take(5)
            ->get();

        return response()->json(['topUsers' => $topUsers]);
    }

    public function detailArtist($artistId)
    {
        $artistInfo = DB::table('users')
            ->select('users.id', 'users.name', 'users.avatar', DB::raw('SUM(music.view) as total_view'))
            ->join('music', 'users.id', '=', 'music.id_user')
            ->where('users.id', $artistId)
            ->groupBy('users.id', 'users.name', 'users.avatar')
            ->first();

        $songs = DB::table('music')
            ->select('id', 'name', 'view', 'thumbnail')
            ->where('id_user', $artistId)
            ->get();

        return Inertia::render('Admin/thongke/ArtistDetail', ['artistInfo' => $artistInfo, 'songs' => $songs]);
    }

    public function getUserMusicInfo()
    {
        try {
            $userId = Auth::id();
            $userMusicInfo = Music::where('id_user', $userId)->get();
            $totalSongs = $userMusicInfo->count();
            $totalAlbums = Album::where('id_user', $userId)->count();
            return response()->json(['userMusicInfo' => $userMusicInfo, 'totalSongs' => $totalSongs, 'totalAlbums' => $totalAlbums]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching user music info'], 500);
        }
    }

    public function getTotalView()
    {
        try {
            $userId = Auth::id();
            $totalView = Music::where('id_user', $userId)->sum('view');


            return response()->json(['totalView' => $totalView]);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Error fetching total view'], 500);
        }
    }


    public function detailArtistT()
    {
        return Inertia::render('Admin/thongke/ArtistDetail');
    }
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d76b929 (cmf)
>>>>>>> 4d74403 (cmf)
=======
>>>>>>> edf87ce (cmft)
=======
>>>>>>> main
