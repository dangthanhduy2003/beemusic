<?php
namespace App\Http\Controllers;
use App\Models\Music;
use App\Models\Music_cate;
use App\Models\Album;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AlbumController extends Controller
{
    public function ListAlbum()
    {
        // Lấy id của user đang đăng nhập
        $user = Auth::user();
        // Lấy danh sách âm nhạc dựa trên user đang đăng nhập
        $album = Album::where('id_user', $user->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('User/album/ListAlbum', ['album' => $album]);
    }

    public function AddAlbum(Request $request)
    {
        $album = new Album;
        $user = Auth::user();
        $album->name_album = $request->input('name_album');
        $album->id_user = $user->id;
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
        // Lưu thông tin tin tức đã cập nhật vào cơ sở dữ liệu
        $album->save();

        return redirect('/album/list');
    }

    //xóa danh mục
    public function Delete($id)
    {
        $album = Album::find($id);
        $album->delete();
        return redirect('/album/list');
    }
}
