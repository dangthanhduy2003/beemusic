<?php
namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
use Illuminate\Support\Facades\Log;
>>>>>>> 982dafd (update favorite)
=======
>>>>>>> fc18299 (updateee)
=======
=======
use Illuminate\Support\Facades\Log;
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)

=======
use Illuminate\Support\Facades\Log;
>>>>>>> 3b16a27 (up-3)

Paginator::useBootstrap();
class MusicController extends Controller
{

    public function search(Request $request)
    {
        // Lấy id của user đang đăng nhập
        $user = Auth::user();

        // Kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        if ($user->id_role === 1) {
            // Lấy toàn bộ danh sách âm nhạc
            $query = Music::query();
        } else {
            // Lấy danh sách âm nhạc dựa trên user đang đăng nhập
            $query = Music::where('id_user', $user->id);
        }

        // Tìm kiếm không phân biệt chữ hoa chữ thường và không phân biệt dấu
        if ($request->has('searchTerm')) {
            $searchTerm = $request->input('searchTerm');
            $query->where(function ($query) use ($searchTerm) {
                $query->whereRaw('LOWER(name) like ?', ['%' . mb_strtolower($searchTerm, 'UTF-8') . '%'])
                    ->orWhereRaw('LOWER(artist) like ?', ['%' . mb_strtolower($searchTerm, 'UTF-8') . '%']);
            });
        }

        $music = $query->orderBy('created_at', 'desc')->get();
        $categories = Categories::all();

        return Inertia::render('Admin/music/ListMusic', ['music' => $music, 'categories' => $categories]);
    }


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
    //thêm bài hát
    // lưu lại dữ liệu thêm
    public function AddMusic(Request $request)
    {
        $music = new Music;
        $music->name = $request->input('name');
        $music->artist = $request->input('artist');
        // Người dùng đã đăng nhập
        $user = Auth::user();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        $music->id_user = $user->id;
=======
        $music->id_user =  $user->id;
>>>>>>> 982dafd (update favorite)
=======
        $music->id_user = $user->id;
>>>>>>> fc18299 (updateee)
=======
        $music->id_user = $user->id;
=======
        $music->id_user =  $user->id;
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)

=======
        $music->id_user = $user->id;
>>>>>>> 3b16a27 (up-3)

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
            $music->artist = $request->input('artist');
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
        $music->delete();
        return redirect('/music/list');
    }
<<<<<<< HEAD

    public function increaseView(Request $request, $musicId)
    {
        $music = Music::find($musicId);

        if ($music) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            // Tăng lượt view
            Log::info("Attempting to increase view for music ID: $musicId");
>>>>>>> 982dafd (update favorite)
=======
>>>>>>> fc18299 (updateee)
=======
=======
            // Tăng lượt view
            Log::info("Attempting to increase view for music ID: $musicId");
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
            $music->view = $music->view + 1;
            $music->save();

            return response()->json(['message' => 'Lượt view đã được cập nhật']);
        } else {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
            Log::info("View increased successfully for music ID: $musicId");
>>>>>>> 982dafd (update favorite)
=======
>>>>>>> fc18299 (updateee)
=======
=======
            Log::info("View increased successfully for music ID: $musicId");
>>>>>>> 4976f32 (update favorite)
>>>>>>> 6ae36b2 (update favorite)
            return response()->json(['message' => 'Không tìm thấy bài hát'], 404);
        }
    }

=======
>>>>>>> 3b16a27 (up-3)
}
