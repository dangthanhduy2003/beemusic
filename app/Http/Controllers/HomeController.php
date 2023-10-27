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
    public function ListHome()
    {
        // Kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        $music = Music::orderBy('created_at', 'desc')->take(6)->get();
        // Hiển thị nhạc theo danh mục
        $music_cate = Music_cate::find($id_categories=4);
        for($i=0;$i<=count($music_cate);$i++){
            
        }
        $id_music= $music_cate->id_music;
        // Lấy tất cả bài hát dựa trên id_categories
        return Inertia::render('Client/Home', ['music' => $music]);
    }
}    
