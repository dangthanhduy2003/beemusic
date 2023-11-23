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

class AlbumController extends Controller
{


    public function search(Request $request)
{
    $user = Auth::user();
    $searchTerm = $request->input('search');

    // Lấy danh sách album dựa trên từ khóa tìm kiếm và user đang đăng nhập
    $albums = Album::where('id_user', $user->id)
        ->where('name_album', 'like', "%$searchTerm%")
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('User/album/ListAlbum', ['album' => $albums]);
}
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
        $album = new Album;
        $user = Auth::user();
        $album->name_album = $request->input('name_album');
        $album->id_user = $user->id;
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            // Đảm bảo rằng thư mục public/upload/images đã tồn tại, nếu không thì tạo mới
            $path = public_path('upload/images');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            // Lưu ảnh vào thư mục public/upload/images
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('upload/images'), $fileName);
            // Lấy đường dẫn của ảnh
            $avatar = $fileName;
            // Lưu đường dẫn vào cơ sở dữ liệu
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

    //xóa danh mục
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
        $album = Album::find($id); // Lấy thông tin của album
        $album_music = Album_music::where('id_album', $id)->with('music')->take(6)->get();
        $musicCate = $album_music->pluck('music');
        $id_album= $id;
        //
        $user = Auth::user();
        //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
        if($user->id_role === 1) {
            // Lấy toàn bộ danh sách âm nhạc
            $musicList = Music::whereNotIn('id', $album_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        } else {
            // Lấy danh sách âm nhạc dựa trên user đang đăng nhập

            $musicList = Music::where('id', $user->id)->whereNotIn('id', $album_music->pluck('id_music'))->orderBy('created_at', 'desc')->get();
        }

       $searchTerm = $request->input('search');
    if ($searchTerm) {
        $musicList = $musicList->where('name', 'like', "%$searchTerm%");
    }

    return Inertia::render('User/album/ListMusicAlbum', ['musicCate' => $musicCate, 'musicList' => $musicList, 'id_album' => $id_album]);
    }

    public function addMusicAlbum(Request $request ,$id)
{
    $album_music = new Album_music;
    $id_album = $id;
    $id_music_array = $request->input('id_music');
    if (!empty($id_music_array)) {
        foreach ($id_music_array as $id_music) {
            // Tạo một bản ghi mới trong bảng trung gian Album_music
            $album_music = new Album_music;
            $album_music->id_album = $id_album;
            $album_music->id_music = $id_music;
            $album_music->save();
        }
    }
    return redirect(url('/album/listMusic/' . $id));

}
//xóa bài hát của album
public function DeleteMusic($id,$id_album)
{
    $album_music = Album_music::where('id_music', $id)->delete();
    return redirect(url('/album/listMusic/' . $id_album));
}

}
