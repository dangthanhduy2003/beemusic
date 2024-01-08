<?php

namespace App\Http\Controllers;

use App\Models\Album_music;
use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use App\Models\Lyrics;
use App\Models\ListenHistory;
use App\Models\FavoriteSong;
use App\Models\Music_home;
use App\Models\music_view;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

Paginator::useBootstrap();
class MusicController extends Controller
{


    //hiển thị list bài hát
    public function ListMusic()
    {
        // Lấy id của user đang đăng nhập
        $user = Auth::user();
        //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        if ($user->id_role === 1) {
            // Lấy toàn bộ danh sách âm nhạc
            $music = Music::orderBy('created_at', 'desc')->get();
        } else {
            // Lấy danh sách âm nhạc dựa trên user đang đăng nhập
            $music = Music::where('id_user', $user->id)->orderBy('created_at', 'desc')->get();
        }
        $categories = Categories::all();
        return Inertia::render('Admin/music/ListMusic', ['music' => $music, 'categories' => $categories]);
    }

    public function Add()
    {
        $categories = Categories::all();
        return Inertia::render('Admin/music/AddMusic', ['categories' => $categories]);
    }

    public function AddMusic(Request $request)
    {
        // Tạo một rule để kiểm tra phần mở rộng tệp âm thanh
        $audioMimeTypesRule = 'mimetypes:audio/mpeg,audio/wav';

        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'artist' => 'required',
            'time' => 'required',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link_file' => "required|file|$audioMimeTypesRule",
            'id_categories' => 'required|array|min:1', // ít nhất một danh mục được chọn

        ], [
            'thumbnail.required' => 'Vui lòng chọn ảnh.',
            'thumbnail.image' => 'Tệp tin phải là ảnh.',
            'thumbnail.mimes' => 'Định dạng ảnh phải là jpeg, png, jpg, gif, hoặc svg.',
            'link_file.required' => 'Vui lòng chọn tệp âm thanh.',
            'link_file.file' => 'Tệp tin phải là một tệp âm thanh.',
            'link_file.in' => 'Phần mở rộng tệp âm thanh không hợp lệ.',
            'id_categories.required' => 'Vui lòng chọn ít nhất một danh mục.',
            'id_categories.min' => 'Vui lòng chọn ít nhất một danh mục.',
        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Tạo mới đối tượng Music
        $music = new Music;
        $music->name = $request->input('name');
        $music->artist = $request->input('artist');
        $music->time = $request->input('time');
        $user = Auth::user();
        $music->id_user = $user->id;
        $music->price = $request->input('price');
        $music->license = $request->input('license');
        // Xử lý thumbnail
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $path = public_path('upload/images');

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $fileName);
            $thumbnail = $fileName;
            $music->thumbnail = $thumbnail;
        }

        // Xử lý link_file
        if ($request->hasFile('link_file')) {
            $file = $request->file('link_file');
            $extension = $file->getClientOriginalExtension();

            if ($extension == 'mp3' || $extension == 'wav') {
                $path = public_path('upload/audio');

                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }

                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move($path, $fileName);
                $link_file = $fileName;
                $music->link_file = $link_file;
            }
        }


        // Lưu các trường dữ liệu khác
        // $music->lyrics = $request->input('lyrics');
        $music->view = 0;
        $music->save();
        //thêm lyrics
        $lyricsData = $request->input('lyrics');

        if (!empty($lyricsData)) {
            foreach ($lyricsData as $lyricData) {
                $lyrics = new Lyrics;
                $lyrics->id_music = $music->id;
                $lyrics->start_time = $lyricData['start_time'];
                $lyrics->end_time = $lyricData['end_time'];
                $lyrics->content = $lyricData['content'];
                $lyrics->save();
            }
        }


        // Lưu các danh mục đã chọn
        // Lấy mảng các 'id_categories' từ request
        $selectedCategories = $request->input('id_categories');

        // Kiểm tra xem mảng $selectedCategories có giá trị hay không
        if (!empty($selectedCategories)) {
            // Duyệt qua mỗi phần tử trong mảng $selectedCategories
            foreach ($selectedCategories as $categoryId) {
                // Tạo một bản ghi mới trong bảng Music_cate
                $musicCategory = new Music_cate();
                // Gán giá trị 'id_music' từ thuộc tính 'id' của đối tượng $music
                $musicCategory->id_music = $music->id;
                // Gán giá trị 'id_categories' từ mỗi phần tử trong mảng $selectedCategories
                $musicCategory->id_categories = $categoryId;
                // Lưu bản ghi mới vào cơ sở dữ liệu
                $musicCategory->save();
            }
        }

        return redirect('/music/list');
    }

    public function Update(Request $request, $id)
    {
        $music = Music::find($id);
        $categories = Categories::all();
        $musicCates = Music_cate::where('id_music', $id)->get();
        $lyrics = Lyrics::where('id_music', $id)->get();
        $selectedCategories = [];

        // Kiểm tra xem $musicCates có giá trị không trước khi sử dụng pluck
        if ($musicCates) {
            $selectedCategories = $musicCates->pluck('id_categories')->toArray();
        }
        return Inertia::render('Admin/music/EditMusic', ['music' => $music, 'lyrics'=>$lyrics, 'musicCate' => $musicCates, 'categories' => $categories, 'selectedCategories' => $selectedCategories]);
    }
    //lưu dữ liệu khi cập nhật
    public function UpdateMusic(Request $request, $id)
    {
        // Tạo một rule để kiểm tra phần mở rộng tệp âm thanh
        //   $audioMimeTypesRule = 'mimetypes:audio/mpeg,audio/wav';

        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'artist' => 'required',
            'time' => 'required',
            //   'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'lyrics' => 'required',
            //   'link_file' => "required|file|$audioMimeTypesRule",
            'id_categories' => 'required|array|min:1', // ít nhất một danh mục được chọn
        ], [
            'thumbnail.required' => 'Vui lòng chọn ảnh.',
            'thumbnail.image' => 'Tệp tin phải là ảnh.',
            'thumbnail.mimes' => 'Định dạng ảnh phải là jpeg, png, jpg, gif, hoặc svg.',
            'lyrics.required' => 'Vui lòng nhập lời bài hát.',
            'link_file.required' => 'Vui lòng chọn tệp âm thanh.',
            'link_file.file' => 'Tệp tin phải là một tệp âm thanh.',
            'link_file.in' => 'Phần mở rộng tệp âm thanh không hợp lệ.',
            'id_categories.required' => 'Vui lòng chọn ít nhất một danh mục.',
            'id_categories.min' => 'Vui lòng chọn ít nhất một danh mục.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $music = Music::find($id);
        if ($music) {
            $music->name = $request->input('name');
            $music->artist = $request->input('artist');
            $music->time = $request->input('time');
            $music->price = $request->input('price', 0);
            $music->license = $request->input('license', 0);
            $music->view = 0;
            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                // Đảm bảo rằng thư mục public/upload/images đã tồn tại, nếu không thì tạo mới
                $path = public_path('/upload/images');
                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }
                // Lưu ảnh vào thư mục public/upload/images
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('/upload/images'), $fileName);
                // Lấy đường dẫn của ảnh
                $thumbnail = $fileName;
                // Lưu đường dẫn vào cơ sở dữ liệu
                $music->thumbnail = $thumbnail;
            } else { // Thêm phần xử lý khi không có ảnh mới
                $music->thumbnail = $music->thumbnail; // Giữ nguyên ảnh cũ
            }

            //thêm file âm thanh
            if ($request->hasFile('link_file')) {
                $file = $request->file('link_file');
                $extension = $file->getClientOriginalExtension();
                // Kiểm tra phần mở rộng tệp có nằm trong danh sách cho phép hay không
                if ($extension == 'mp3' || $extension == 'wav') {
                    // Xử lý tệp âm thanh như trong mã trước đó
                    $path = public_path('/upload/audio');
                    if (!file_exists($path)) {
                        mkdir($path, 0777, true);
                    }
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->move(public_path('/upload/audio'), $fileName);
                    $link_file = $fileName;
                    $music->link_file = $link_file;
                } else {
                    // Nếu phần mở rộng tệp không hợp lệ, bạn có thể thực hiện hành động cần thiết ở đây.
                }
            }
            $music->save();
            //sửa lyric
            //xóa các bảng ghi trước đó
            Lyrics::where('id_music', $music->id)->delete();
            $lyricsData = $request->input('lyrics');
   
            foreach ($lyricsData as $lyricData) {
                $lyrics = new Lyrics;
                $lyrics->id_music = $music->id;
                $lyrics->start_time = $lyricData['start_time'];
                $lyrics->end_time = $lyricData['end_time'];
                $lyrics->content = $lyricData['content'];
                $lyrics->save();
            }
        

            // Xóa các danh mục cũ của bài hát
            Music_cate::where('id_music', $music->id)->delete();
            // Lưu các danh mục đã chọn
            $selectedCategories = $request->input('id_categories');
            foreach ($selectedCategories as $categoryId) {
                // Tạo một bản ghi mới trong bảng trung gian Music_cate
                $musicCategory = new Music_cate();
                $musicCategory->id_music = $music->id;
                $musicCategory->id_categories = $categoryId;
                $musicCategory->save();
            }
        }
        return redirect('/music/list');
    }
    //xóa music
    public function Delete($id)
    {
        $music = Music::find($id);
        $avatarPath = public_path('upload/images/' . $music->thumbnail);
        $audioPath = public_path('upload/audio/' . $music->link_file);

        // Kiểm tra xem tệp tồn tại trước khi xóa
        if (file_exists($avatarPath)) {
            // Xóa tệp tin
            unlink($avatarPath);
        }
        // Kiểm tra xem tệp âm thanh tồn tại trước khi xóa
        if (file_exists($audioPath)) {
            // Xóa tệp âm thanh
            unlink($audioPath);
        }
        //xóa luôn ở bảng music_cate
        Music_cate::where('id_music', $music->id)->delete();
        Lyrics::where('id_music', $music->id)->delete();
        Music_home::where('id_music', $music->id)->delete();
        music_view::where('id_music', $music->id)->delete();
        Album_music::where('id_music', $music->id)->delete();
        ListenHistory::where('song_id', $music->id)->delete();
        FavoriteSong::where('song_id', $music->id)->delete();
        $music->delete();
        return redirect('/music/list');
    }
}
