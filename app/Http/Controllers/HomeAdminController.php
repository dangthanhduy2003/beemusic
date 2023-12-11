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
        $home_music = Music_home::where('id_home', $id)->with('music')->get();
        $musicHome = $home_music->pluck('music');
        $id_home= $id;
        $musicList = Music::whereNotIn('id', $home_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/home/ListMusicHome', ['musicHome' => $musicHome, 'musicList' => $musicList, 'id_home'=>$id_home]);
    }


    public function addMusicHome(Request $request ,$id){
        $home_music = new Music_home;
        $id_home = $id;
    $id_music_array = $request->input('id_music');
    if (!empty($id_music_array)) {
        foreach ($id_music_array as $id_music) {
            // Tạo một bản ghi mới trong bảng trung gian Album_music
            $home_music = new Music_home;
            $home_music->id_home = $id_home;
            $home_music->id_music = $id_music;
            $home_music->save();
        }
    }
    return redirect(url('/home/listMusic/' . $id));
    }

    public function DeleteMusicHome($id,$id_home)
{
    $home_music = Music_home::where('id_home', $id)->delete();
    return redirect(url('/home/listMusic/' . $id_home));
}
}
