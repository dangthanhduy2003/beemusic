<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Album_music;
use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use App\Models\Music_home;
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
        $id=1;
        $home_music = Music_home::where('id_home', $id)->with('music')->get();
        $music = $home_music->pluck('music');
       
        $artist = User::where('id_role', 3)->orderBy('created_at', 'desc')->take(6)->get();
        // Hiển thị nhạc theo danh mục
        //id là 3 và 4
        $id_2=2;
       
       
        $home_music = Music_home::where('id_home', $id_2)->with('music')->get();
        $musicByCategory = $home_music->pluck('music');

        $id_3=3;
        $home_music = Music_home::where('id_home', $id_3)->with('music')->get();
        $musicCategory = $home_music->pluck('music');

        return Inertia::render('Client/Home', [
            'music' => $music,
            'artist' => $artist,
            'musicByCategory' => $musicByCategory,
            'musicCategory' => $musicCategory
        ]);
    }

    public function ListCate()
    {
        //Hiển thị toàn bộ categories
        $cate = Categories::orderBy('created_at', 'desc')->get();
        return Inertia::render('Client/Category', ['cate' => $cate]);
    }
    //hiển thị theo danh mục
    public function MusicCate($id)
    {
        $categories = Categories::find($id); // Lấy thông tin của danh mục
        $musicCate = Music::with('musicCates')
            ->whereHas('musicCates', function ($query) use ($id) {
                $query->where('id_categories', $id);
            })->get();
        return Inertia::render('Client/MusicCate', ['musicCate' => $musicCate, 'categories' => $categories]);
    }
    //hiển thị theo ca sĩ
    public function MusicArtist($id)
    {
        $artist = User::find($id); //lấy thông tin của user
        $musicArtist = Music::with('musicArtist')
            ->whereHas('musicArtist', function ($query) use ($id) {
                $query->where('id_user', $id);
            })->get();
        //hiển thị album theo id ca sĩ
        // Lấy danh sách album của nghệ sĩ
        $album = Album::where('id_user', $id)->get();
        return Inertia::render('Client/MusicArtist', ['musicArtist' => $musicArtist, 'artist' => $artist, 'album' => $album]);
    }
    public function MusicAlbum($id)
    { // Lấy thông tin của album
        $album = Album::find($id);

        // Lấy danh sách các bản ghi từ bảng Album_music với điều kiện id_album chính là $id và tải thông tin về music
        $album_music = Album_music::where('id_album', $id)->with('music')->get();

        // Lấy danh sách nhạc của album
        $musicList = $album_music->pluck('music');


        return Inertia::render('Client/MusicAlbum', ['musicList' => $musicList]);
    }

    //lấy danh sách phát theo danh mục
    public function LyricId()
    {
        return Inertia::render('Client/LyricsMusic');
    }
    public function search(Request $request)
    {
        $searchTerm = $request->input('search', '');

        // Tìm kiếm danh mục
        $cate = Categories::where('name', 'like', "%$searchTerm%")->orderBy('created_at', 'desc')->get();

        // Tìm kiếm bài hát
        $music = Music::with('musicCates')->where(function ($query) use ($searchTerm) {
            $query->where('name', 'like', "%$searchTerm%")
                ->orWhere('artist', 'like', "%$searchTerm%");
        })->orderBy('created_at', 'desc')->get();

        // Tìm kiếm nghệ sĩ
        $artist = User::where('id_role', 3)->where('name', 'like', "%$searchTerm%")
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Client/Search', ['cate' => $cate, 'artist' => $artist, 'music' => $music]);
    }


    public function getSongsWithSameCategory()
    {
        return Inertia::render('Client/PlayList');
    }

    public function updateView($id)
    {
        $music = Music::find($id);
        // Tăng lượt view
        $music->view = (int)$music->view + 1;
        $music->save();

        return Inertia::render('Client/components/MusicPlayer', ['music' => $music]);
    }

    public function Charts()
    {
        $musics = Music::all();
        return Inertia::render('Client/Charts', ['musics' => $musics]);
    }
}
