<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    //hiển thị toàn bộ danh sách ra trang chủ
    public function ListHome($id)
    {
        //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        $music = Music::orderBy('created_at', 'desc')->take(6)->get();
        $artist = User::where('id_role', 2)->orderBy('created_at', 'desc')->take(6)->get();
        // Hiển thị nhạc theo danh mục
        $music_cate = Music_cate::where('id_categories', 4)->get();

        $id_music = [];
        foreach ($music_cate as $item) {
            $id_music[] = $item->id_music;
        }

        // Lấy tất cả bài hát dựa trên id_categories
        $musicByCategory = Music::whereIn('id', $id_music)->get();
        return Inertia::render('Client/Home', ['music' => $music, 'artist' => $artist, 'musicByCategory' => $musicByCategory]);
    }
}
