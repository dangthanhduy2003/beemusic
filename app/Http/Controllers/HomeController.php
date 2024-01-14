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
use App\Models\music_view;
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
            "license" => 0,
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
            ->where('license', 0)
            ->whereHas('musicCates', function ($query) use ($id) {
                $query->where('id_categories', $id);
            })->get();
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musicCate->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        return Inertia::render('Client/MusicCate', [
            'musicCate' => $musicCate,
            'categories' => $categories,
            'lyrics' => $lyrics
        ]);
    }
    //hiển thị theo ca sĩ
    public function MusicArtist($id)
    {
        $artist = User::find($id); //lấy thông tin của user
        $musicArtist = Music::with('musicArtist')
            ->where('license', 0)
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
            'musicArtist' => $musicArtist,
            'artist' => $artist,
            'album' => $album,
            'lyrics' => $lyrics
        ]);
    }
    public function MusicAlbum($id)
    { // Lấy thông tin của album
        $album = Album::find($id);

        // Lấy danh sách các bản ghi từ bảng Album_music với điều kiện id_album chính là $id và tải thông tin về music
        $album_music = Album_music::where('id_album', $id)->with('music')->where('license', 0)->get();

        // Lấy danh sách nhạc của album
        $musicList = $album_music->pluck('music');
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musicList->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();


        return Inertia::render('Client/MusicAlbum', [
            'musicList' => $musicList,
            'album' => $album,
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
        $music = Music::with('musicCates')
            ->where(function ($query) use ($searchTerm) {
                $query->where('name', 'like', "%$searchTerm%")
                    ->orWhere('artist', 'like', "%$searchTerm%");
            })
            ->where('license', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $music->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();

        // Tìm kiếm nghệ sĩ
        $artist = User::where('id_role', 3)->where('name', 'like', "%$searchTerm%")
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Client/Search', [
            'cate' => $cate,
            'artist' => $artist,
            'music' => $music,
            'lyrics' => $lyrics,
            "license" => 0,
        ]);
    }



    public function getSongsWithSameCategory()
    {
        return Inertia::render('Client/PlayList');
    }

    public function updateView($id)
    {
        $music = Music::find($id);

        // Tăng lượt view trong bảng music
        $music->view = (int) $music->view + 1;
        $music->save();

        // Kiểm tra xem đã có bản ghi cho ngày hôm nay trong bảng music_view chưa
        $today = now()->toDateString();
        $musicView = Music_view::where('id_music', $id)
            ->whereDate('created_at', $today)
            ->first();

        if ($musicView) {
            // Nếu đã có, cộng dồn lượt view
            $musicView->view += 1;
            $musicView->save();
        } else {
            // Nếu chưa có, tạo mới bản ghi
            Music_view::create([
                'id_music' => $id,
                'view' => 1,
                'created_at' => $today,
            ]);
        }

        return Inertia::render('Client/components/MusicPlayer', ['music' => $music]);
    }


    public function Charts()
    {
        $musics = Music::where('license', 0)->get();
        // Tạo một mảng chứa id của từng bài hát
        $musicIds = $musics->pluck('id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        return Inertia::render('Client/Charts', ['musics' => $musics, 'lyrics' => $lyrics]);
    }
    public function ChartsDay()
    {
        // Lấy ngày hiện tại
        $currentDate = now()->format('Y-m-d');

        // Truy vấn để lấy thông tin của 5 bài hát có lượt xem cao nhất trong ngày từ bảng music_view
        $topSongs = music_view::whereDate('created_at', $currentDate)
            ->orderByDesc('view')
            ->get();

        // Kiểm tra nếu có bài hát được lấy ra thì tiếp tục lấy thông tin từ bảng Music
        if ($topSongs->isNotEmpty()) {
            $musicIds = $topSongs->pluck('id_music')->toArray();

            // Lấy thông tin của các bài hát từ bảng Music
            $musics = Music::whereIn('id', $musicIds)
                ->orderBy(DB::raw('FIELD(id, ' . implode(',', $musicIds) . ')'))
                ->where('license', 0)
                ->get();

            // Lấy lời bài hát dựa trên id của từng bài hát từ bảng music
            $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        } else {
            // Không có lượt xem nào trong ngày, trả về dữ liệu trống
            $musics = collect();
            $lyrics = collect();
        }

        return Inertia::render('Client/ChartsDay', ['musics' => $musics, 'lyrics' => $lyrics, 'topSongs' => $topSongs]);
    }

    //theo tháng
    public function ChartsMonth()
    {
        // Lấy tháng và năm hiện tại
        $currentMonth = now()->format('m');
        $currentYear = now()->format('Y');

        // Truy vấn để lấy tổng lượt xem của từng bài hát trong tháng từ bảng music_view
        $topSongs = music_view::whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('id_music') // Nhóm theo id_music
            ->select('id_music', DB::raw('SUM(view) as total_view'))
            ->orderByDesc('total_view') // Sắp xếp theo tổng lượt xem
            ->take(5) // Chỉ lấy 5 bản ghi
            ->get();

        // Kiểm tra nếu có bài hát được lấy ra thì tiếp tục lấy thông tin từ bảng Music
        if ($topSongs->isNotEmpty()) {
            $musicIds = $topSongs->pluck('id_music')->toArray();

            // Lấy thông tin của các bài hát từ bảng Music
            $musics = Music::whereIn('id', $musicIds)
                ->orderBy(DB::raw('FIELD(id, ' . implode(',', $musicIds) . ')'))
                ->where('license', 0)
                ->get();
            // Lấy lời bài hát dựa trên id của từng bài hát từ bảng music
            $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        } else {
            // Không có lượt xem nào trong tháng, trả về dữ liệu trống
            $musics = collect();
            $lyrics = collect();
        }

        return Inertia::render('Client/ChartsMonth', ['musics' => $musics, 'lyrics' => $lyrics, 'topSongs' => $topSongs]);
    }



}
