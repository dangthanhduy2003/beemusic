<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Home;
use App\Models\Home_music;
use App\Models\Music_home;
use Illuminate\Http\Request;
use Inertia\Inertia;
class HomeAdminController extends Controller
{
    public function ListHome(){
        $home = Home::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/home/ListHome', ['home' => $home]);
    }


    public function listMusic(Request $request, $id = 0)
{
    $home = Home::find($id); // Lấy thông tin của home
    $music_home = Music_home::where('id_home', $id)->with('music')->get();

    // Lấy tất cả âm nhạc từ bảng home_music có id_home tương ứng
    $allMusic = $music_home->pluck('music');

    // Các xử lý khác nếu cần

    return Inertia::render('Admin/home/ListMusicHome.', ['allMusic' => $allMusic]);
}
}
