<?php

namespace App\Http\Controllers;

use App\Models\Music;
use App\Models\Music_cate;
use App\Models\Album;
use App\Models\Album_music;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{


    public function ListAlbum()
    {
        // Lấy id của user đang đăng nhập
        $user = Auth::user();
        // Kiểm tra nếu id_user là 1 thì lấy tất cả album
        if ($user->id_role == 1) {
            $album = Album::orderBy('created_at', 'desc')->get();
        } else {
            // Lấy danh sách âm nhạc dựa trên user đang đăng nhập
            $album = Album::where('id_user', $user->id)->orderBy('created_at', 'desc')->get();
        }
        return Inertia::render('User/album/ListAlbum', ['album' => $album]);
    }

    public function AddAlbum(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name_album' => 'required',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ], [
            'name_album.required' => 'Vui lòng nhập tên album.',
            'avatar.required' => 'Vui lòng chọn ảnh đại diện cho album.',
            'avatar.image' => 'Tệp tin phải là ảnh.',
            'avatar.mimes' => 'Định dạng ảnh phải là jpeg, png, jpg, gif, hoặc svg.',
            'avatar.max' => 'Kích thước ảnh không được vượt quá 2MB.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $album = new Album;
        $user = Auth::user();
        $album->name_album = $request->input('name_album');
        $album->id_user = $user->id;
        // Kiểm tra xem request có chứa file có tên là 'avatar' không
        if ($request->hasFile('avatar')) {
            // Nếu có, lấy đối tượng của file từ request
            $file = $request->file('avatar');

            // Đảm bảo rằng thư mục public/upload/images đã tồn tại, nếu không thì tạo mới
            $path = public_path('upload/images');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            // Tạo một tên file mới bằng cách kết hợp thời gian hiện tại và tên gốc của file
            $fileName = time() . '_' . $file->getClientOriginalName();

            // Di chuyển file vào thư mục public/upload/images với tên mới đã tạo
            $file->move(public_path('upload/images'), $fileName);

            // Lấy đường dẫn của ảnh mới được lưu
            $avatar = $fileName;

            // Lưu đường dẫn vào cơ sở dữ liệu (giả sử $album là một đối tượng có trường 'avatar')
            $album->avatar = $avatar;
        }

        $album->save();
        return redirect('/album/list');
    }

    public function Update($id)
    {
        $album = Album::find($id);
        return Inertia::render('User/album/EditAlbum', ['album' => $album]);
    }

    public function UpdateAlbum(Request $request, $id)
    {
        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name_album' => 'required',
        ], [
            'name_album.required' => 'Vui lòng nhập tên album.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        // Tìm tin tức theo $id
        $album = Album::find($id);
        // Cập nhật các trường
        $album->name_album = $request->input('name_album');
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = public_path('upload/images');

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $fileName);
            $avatar = $fileName;
            $album->avatar = $avatar;
        } else { // Thêm phần xử lý khi không có ảnh mới
            $album->avatar = $album->avatar; // Giữ nguyên ảnh cũ
        }
        // Lưu thông tin tin tức đã cập nhật vào cơ sở dữ liệu
        $album->save();

        return redirect('/album/list');
    }

    //xóa album
    public function Delete($id)
    {
        $album = Album::find($id);
        $avatarPath = public_path('upload/images/' . $album->avatar);

        // Kiểm tra xem tệp tồn tại trước khi xóa
        if (file_exists($avatarPath)) {
            // Xóa tệp tin
            unlink($avatarPath);
        }

        $album = Album::find($id);
        Album_music::where('id_album', $album->id)->delete();
        $album->delete();
        return redirect('/album/list');
    }


    //phần artist thêm nhạc vào album
    public function listMusic(Request $request, $id = 0)
    {
        // Lấy thông tin của album dựa trên $id
        $album = Album::find($id);

        // Lấy danh sách các bản nhạc của album và kèm theo thông tin chi tiết về mỗi bản nhạc
        $album_music = Album_music::where('id_album', $id)->with('music')->get();

        // Trích xuất thông tin về âm nhạc từ danh sách $album_music
        $musicCate = $album_music->pluck('music');

        // Gán giá trị cho biến $id_album
        $id_album = $id;

        // Lấy thông tin về người dùng đang đăng nhập
        $user = Auth::user();

        // Kiểm tra xem người dùng có vai trò là admin không
        if ($user->id_role === 1) {
            // Nếu là admin, lấy toàn bộ danh sách âm nhạc
            $musicList = Music::whereNotIn('id', $album_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        } else {
            // Nếu không phải admin, lấy danh sách âm nhạc dựa trên người dùng đang đăng nhập  /whereNotIn dùng để lấy những bài nhạc chưa có trong album
            $musicList = Music::where('id_user', $user->id)->whereNotIn('id', $album_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        }

        // Lấy từ khóa tìm kiếm từ request
        $searchTerm = $request->input('search');

        // Nếu có từ khóa tìm kiếm, lọc danh sách âm nhạc
        if ($searchTerm) {
            $musicList = $musicList->where('name', 'like', "%$searchTerm%");
        }

        // Render trang sử dụng Inertia với các dữ liệu cần thiết
        return Inertia::render('User/album/ListMusicAlbum', [
            'musicCate' => $musicCate,
            'musicList' => $musicList,
            'id_album' => $id_album,
            'album' => $album
        ]);
    }


    public function addMusicAlbum(Request $request, $id)
    {
        // Lấy giá trị của biến $id từ tham số đường dẫn URL
        $id_album = $id;

        // Lấy mảng các id_music từ request
        $id_music_array = $request->input('id_music');

        // Kiểm tra xem mảng id_music_array có giá trị hay không
        if (!empty($id_music_array)) {
            // Duyệt qua mỗi phần tử trong mảng id_music_array
            foreach ($id_music_array as $id_music) {
                // Tạo một bản ghi mới trong bảng trung gian Album_music
                $album_music = new Album_music;
                // Gán giá trị id_album từ biến $id
                $album_music->id_album = $id_album;
                // Gán giá trị id_music từ mỗi phần tử trong mảng
                $album_music->id_music = $id_music;
                // Lưu bản ghi mới vào cơ sở dữ liệu
                $album_music->save();
            }
        }

        // Chuyển hướng đến trang danh sách âm nhạc của album có id là $id
        return redirect(url('/album/listMusic/' . $id));
    }
    //xóa bài hát của album
    public function DeleteMusic($id, $id_album)
    {
        $album_music = Album_music::where('id_music', $id)->where('id_album', $id_album)->delete();
        return redirect(url('/album/listMusic/' . $id_album));
    }

}
