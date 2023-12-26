<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Music;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;



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

}
