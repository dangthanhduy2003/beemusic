<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Home;
use App\Models\Home_music;
use App\Models\Music;
use App\Models\Music_home;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeAdminController extends Controller
{
    public function ListHome()
    {
        $home = Home::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/home/ListHome', ['home' => $home]);
    }


    public function listMusic(Request $request, $id = 0)
    {
        $home = Home::find($id); // Lấy thông tin của album
        $home_music = Music_home::where('id_home', $id)->with('music')->get();
        $musicHome = $home_music->pluck('music');
        $musicList = Music::whereNotIn('id', $home_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/home/ListMusicHome', ['musicHome' => $musicHome, 'musicList' => $musicList]);
    }
}
