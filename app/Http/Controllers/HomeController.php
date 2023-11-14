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
        //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        $music = Music::with('musicCates')->orderBy('created_at', 'desc')->take(6)->get();
        $artist = User::where('id_role', 3)->orderBy('created_at', 'desc')->take(6)->get();
        // Hiển thị nhạc theo danh mục
        //id là 3 và 4
        $id_categories_3 = 3;
        $id_categories_4 = 4;
        $musicByCategory = Music::with('musicCates')
            ->whereHas('musicCates', function ($query) use ($id_categories_3) {
                $query->where('id_categories', $id_categories_3);
            })->take(6)->get();
        $musicCategory = Music::with('musicCates')
            ->whereHas('musicCates', function ($query) use ($id_categories_4) {
                $query->where('id_categories', $id_categories_4);
            })->take(6)->get();

        return Inertia::render('Client/Home', [
            'music' => $music, 'artist' => $artist,
            'musicByCategory' => $musicByCategory, 'musicCategory' => $musicCategory
        ]);
    }

    public function ListCate()
    {
        //Hiển thị toàn bộ categories
        $cate = Categories::orderBy('created_at', 'desc')->get();
        return Inertia::render('Client/Category', ['cate' => $cate]);
    }

    public function MusicCate($id)
    {
        $categories = Categories::find($id); // Lấy thông tin của danh mục
        $musicCate = Music::with('musicCates')
            ->whereHas('musicCates', function ($query) use ($id) {
                $query->where('id_categories', $id);
            })->get();
        return Inertia::render('Client/MusicCate', ['musicCate' => $musicCate, 'categories' => $categories]);
    }

    public function LyricId($id)
    {
        $music = Music::find($id);
        return Inertia::render('Client/LyricsMusic', ['music' => $music]);
    }

    public function Search()
    {
        $music = Music::with('musicCates')->orderBy('created_at', 'desc')->take(9)->get();
        $artist = User::where('id_role', 3)->orderBy('created_at', 'desc')->take(6)->get();
        $cate = Categories::orderBy('created_at', 'desc')->get();
        return Inertia::render('Client/Search', ['cate' => $cate, 'artist' => $artist, 'music' => $music]);
    }

    public function getSongsWithSameCategory($id)
    {
        $songs = Music_cate::where('id_categories', $id)->with('music')->get();
        $music = $songs->pluck('music');
        return Inertia::render('Client/PlayList', ['music' => $music]);
    }
}
