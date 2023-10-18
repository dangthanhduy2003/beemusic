<?php
namespace App\Http\Controllers;
use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
Paginator::useBootstrap();
class MusicController extends Controller
{

    //hiển thị list
    public function Index(){
        $perpage = 3;
        $data = Music::orderBy('created_at', 'desc')->paginate($perpage);
        return view('Music/List', ['data' => $data]);
    }
    //hiển thị form thêm
    public function Add(){
        $Music_cate = \App\Models\Music_cate::all();
        $Categories = \App\Models\Categories::all();
        return view('Music/Add',['Music_cate'=>$Music_cate,'Categories'=>$Categories]);
    }
    //thêm bài hát
    // lưu lại dữ liệu thêm
    public function Add_(Request $request){
        $t = new Music;
        $t->name = $request->input('name');
        $t->thumbnail = $request->input('thumbnail');
        $t->lyrics = $request->input('lyrics');
        $t->view = 0;
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
                $link_file = 'upload/audio/' . $fileName;
                $t->link_file = $link_file;
            } else {
                // Nếu phần mở rộng tệp không hợp lệ, bạn có thể thực hiện hành động cần thiết ở đây.
            }
        }
        $t->save();
        // Lưu các danh mục đã chọn
    $selectedCategories = $request->input('id_categories');
    if (!empty($selectedCategories)) {
        foreach ($selectedCategories as $categoryId) {
            // Tạo một bản ghi mới trong bảng trung gian MusicCategory
            $musicCategory = new Music_cate();
            $musicCategory->id_music = $t->id;
            $musicCategory->id_categories = $categoryId;
            $musicCategory->save();
        }
    }
        return redirect('/Music/List');
    }


    //cập nhật bài hát
    // public function Update($id){
    //     $music = Music::find($id);
    //     if($music==null) return redirect('/thongbao');
    //     $music_cate = \App\Models\Music_cate::all();
    //     return view("/Music/List",['music'=>$music,'music_cate'=>$music_cate]);
    // }

    public function Update($id){
        $music = Music::find($id);
        $categories = \App\Models\Categories::all();
        $musicCates = \App\Models\Music_cate::where('id_music', $id)->get();
        $selectedCategories = [];
    
        // Kiểm tra xem $musicCates có giá trị không trước khi sử dụng pluck
        if($musicCates) {
            $selectedCategories = $musicCates->pluck('id_categories')->toArray();
        }
    
        if($music == null) {
            return redirect('/thongbao');
        }
        return view("Music.Update", ['music' => $music, 'musicCate' => $musicCates, 'categories' => $categories, 'selectedCategories' => $selectedCategories]);
    }
    //lưu dữ liệu khi cập nhật
    public function Update_(Request $request, $id)
    {
        $t = Music::find($id);
        if($t){
            $t->name = $request->input('name');
            $t->thumbnail = $request->input('thumbnail');
            $t->lyrics = $request->input('lyrics');
            $t->view = 0;
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
                    $link_file = 'upload/audio/' . $fileName;
                    $t->link_file = $link_file;
                } else {
                    // Nếu phần mở rộng tệp không hợp lệ, bạn có thể thực hiện hành động cần thiết ở đây.
                }
            }
            $t->save();
            // Xóa các danh mục cũ của bài hát
            Music_cate::where('id_music', $t->id)->delete();
            // Lưu các danh mục đã chọn
            $selectedCategories = $request->input('id_categories');
            foreach ($selectedCategories as $categoryId) {
                // Tạo một bản ghi mới trong bảng trung gian Music_cate
                $musicCategory = new Music_cate();
                $musicCategory->id_music = $t->id;
                $musicCategory->id_categories = $categoryId;
                $musicCategory->save();
            }
        }
    
        return redirect('/Music/List');
    }
    //xóa music
    public function Delete($id){
        $t = Music::find($id);
        //xóa luôn ở bảng music_cate
        Music_cate::where('id_music', $t->id)->delete();
        if($t==null) return redirect('/thongbao')->with('Thông báo khách hàng không tồn tại');
        $t->delete();
        return redirect('/Music/List');
    }
    
}
