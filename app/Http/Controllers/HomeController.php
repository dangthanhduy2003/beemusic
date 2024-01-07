<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\Album;
use App\Models\Album_music;
use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use App\Models\Music_home;
use App\Models\Home;
use App\Models\Lyrics;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    //hiển thị toàn bộ danh sách ra trang chủ
    public function ListHome()
    {
        //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        $id = 1;

        // Truy vấn cùng với eager loading của mối quan hệ 'musicCates'
        $home_music = Music_home::where('id_home', $id)->with('music.musicCates')->get();

        // Lấy danh sách 'music' đã load 'musicCates'
        $music = $home_music->pluck('music')->flatten();

        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $music->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();

        $artist = User::where('id_role', 3)->orderBy('created_at', 'desc')->get();
        // Hiển thị nhạc theo danh mục
        //id là 3 và 4
        $id_2 = 2;


        $home_music = Music_home::where('id_home', $id_2)->with('music.musicCates')->get();
        $musicByCategory = $home_music->pluck('music')->flatten();

        $id_3 = 3;
        $home_music = Music_home::where('id_home', $id_3)->with('music.musicCates')->get();
        $musicCategory = $home_music->pluck('music')->flatten();
        $nameHome = home::all();
        return Inertia::render('Client/Home', [
            'music' => $music,
            'artist' => $artist,
            'musicByCategory' => $musicByCategory,
            'musicCategory' => $musicCategory,
            'nameHome' => $nameHome,
            'lyrics' => $lyrics,
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
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musicCate->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        return Inertia::render('Client/MusicCate', [
            'musicCate' => $musicCate, 'categories' => $categories,
            'lyrics' => $lyrics
        ]);
    }
    //hiển thị theo ca sĩ
    public function MusicArtist($id)
    {
        $artist = User::find($id); //lấy thông tin của user
        $musicArtist = Music::with('musicArtist')
            ->whereHas('musicArtist', function ($query) use ($id) {
                $query->where('id_user', $id);
            })->get();
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musicArtist->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        //hiển thị album theo id ca sĩ
        // Lấy danh sách album của nghệ sĩ
        $album = Album::where('id_user', $id)->get();
        return Inertia::render('Client/MusicArtist', [
            'musicArtist' => $musicArtist, 'artist' => $artist,
            'album' => $album, 'lyrics' => $lyrics
        ]);
    }
    public function MusicAlbum($id)
    { // Lấy thông tin của album
        $album = Album::find($id);

        // Lấy danh sách các bản ghi từ bảng Album_music với điều kiện id_album chính là $id và tải thông tin về music
        $album_music = Album_music::where('id_album', $id)->with('music')->get();

        // Lấy danh sách nhạc của album
        $musicList = $album_music->pluck('music');
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musicList->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();


        return Inertia::render('Client/MusicAlbum', [
            'musicList' => $musicList, 'album' => $album,
            'lyrics' => $lyrics
        ]);
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
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $music->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();

        // Tìm kiếm nghệ sĩ
        $artist = User::where('id_role', 3)->where('name', 'like', "%$searchTerm%")
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Client/Search', [
            'cate' => $cate, 'artist' => $artist, 'music' => $music,
            'lyrics' => $lyrics
        ]);
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
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musics->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        return Inertia::render('Client/Charts', ['musics' => $musics, 'lyrics' => $lyrics]);
    }
    public function ChartsDay()
{
    // Truy vấn để lấy những bài hát có lượt xem cao nhất trong ngày
    $musics = Music::whereDate('created_at', '<=', now())
        ->orderByDesc('view')
        ->get();

    // Kiểm tra nếu có bài hát được lấy ra thì tiếp tục lấy lời bài hát
    if ($musics->isNotEmpty()) {
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musics->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
    } else {
        $lyrics = collect(); // Nếu không có bài hát, tạo một collection rỗng
    }

    return Inertia::render('Client/ChartsDay', ['musics' => $musics, 'lyrics' => $lyrics]);
}

    

}
