<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;

Paginator::useBootstrap();
class MusicController extends Controller
{

    //hiển thị list bài hát
    public function ListMusic()
    {
        $music = Music::orderBy('created_at', 'desc')->get();
        $categories = Categories::all();
        return Inertia::render('Admin/music/ListMusic', ['music' => $music, 'categories' => $categories]);
    }
    //thêm bài hát
    // lưu lại dữ liệu thêm
    public function AddMusic(Request $request)
    {
        $music = new Music;
        $music->name = $request->input('name');

        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            // Đảm bảo rằng thư mục public/upload/images đã tồn tại, nếu không thì tạo mới
            $path = public_path('upload/images');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            // Lưu ảnh vào thư mục public/upload/images
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('upload/images'), $fileName);
            // Lấy đường dẫn của ảnh
            $thumbnail = $fileName;
            // Lưu đường dẫn vào cơ sở dữ liệu
            $music->thumbnail = $thumbnail;
        }

        $music->lyrics = $request->input('lyrics');
        $music->view = 0;
        //thêm file âm thanh
        if ($request->hasFile('link_file')) {
            $file = $request->file('link_file');
            $extension = $file->getClientOriginalExtension();
            // Kiểm tra phần mở rộng tệp có nằm trong danh sách cho phép hay không
            if ($extension == 'mp3' || $extension == 'wav') {
                // Xử lý tệp âm thanh như trong mã trước đó
                $path = public_path('upload/audio');
                if (!file_exists($path)) {
                    mkdir($path, 0777, true);
                }
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path('upload/audio'), $fileName);
                $link_file = $fileName;
                $music->link_file = $link_file;
            } else {
                // Nếu phần mở rộng tệp không hợp lệ, bạn có thể thực hiện hành động cần thiết ở đây.
            }
        }
        $music->save();
        // Lưu các danh mục đã chọn
        $selectedCategories = $request->input('id_categories');
        if (!empty($selectedCategories)) {
            foreach ($selectedCategories as $categoryId) {
                // Tạo một bản ghi mới trong bảng trung gian MusicCategory
                $musicCategory = new Music_cate();
                $musicCategory->id_music = $music->id;
                $musicCategory->id_categories = $categoryId;
                $musicCategory->save();
            }
        }
        return redirect('/music/list');
    }

    public function Update($id)
    {
        $music = Music::find($id);
        $categories = Categories::all();
        $musicCates = Music_cate::where('id_music', $id)->get();
        $selectedCategories = [];

        // Kiểm tra xem $musicCates có giá trị không trước khi sử dụng pluck
        if ($musicCates) {
            $selectedCategories = $musicCates->pluck('id_categories')->toArray();
        }
        return Inertia::render('Admin/music/EditMusic', ['music' => $music, 'musicCate' => $musicCates, 'categories' => $categories, 'selectedCategories' => $selectedCategories]);
    }
    //lưu dữ liệu khi cập nhật
    public function UpdateMusic(Request $request, $id)
    {
        $music = Music::find($id);
        if ($music) {
            $music->name = $request->input('name');
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
            $music->lyrics = $request->input('lyrics');
            $music->view = 0;
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
        //xóa luôn ở bảng music_cate
        Music_cate::where('id_music', $music->id)->delete();
        $music->delete();
        return redirect('/music/list');
    }
}
