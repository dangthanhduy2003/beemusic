<?php

namespace App\Http\Controllers;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
Paginator::useBootstrap();
class CategoriesController extends Controller
{
// hiển thị danh sách danh mục
public function Index(){
    $perpage = 3;
    $data = Categories::orderBy('created_at', 'desc')->paginate($perpage);
    return view('Categories/DsCategories', ['data' => $data]);
}

// thêm dữ liệu danh mục
public function Add(){
    $data = \App\Models\categories::all();
    return view('Categories/ThemCategories',['data'=>$data]);
}
 // lưu lại dữ liệu thêm
 public function Add_(Request $request){
    $t = new Categories;
    $t->name = $request->input('name');
    // Kiểm tra xem có tệp tin ảnh được tải lên không
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
        $avatar = 'upload/images/' . $fileName;
        // Lưu đường dẫn vào cơ sở dữ liệu
        $t->avatar = $avatar;
    }
    $t->save();

    return redirect('/Categories/List');
}


 //cập nhật Danh mục
 public function Update($id){
    $categories = Categories::find($id);
    if($categories==null) return redirect('/thongbao');
    return view("/Categories/CnCategories",['categories'=>$categories]);
}

public function Update_(Request $request, $id)
{
    // Tìm tin tức theo $id
    $t = Categories::find($id);
    // Kiểm tra xem tin tức có tồn tại không
    if (!$t) {
        return redirect('/thongbao');
    }
    // Cập nhật các trường
    $t->name = $request->input('name');
    // Lưu thông tin tin tức đã cập nhật vào cơ sở dữ liệu
    if ($request->hasFile('avatar')) {
        $file = $request->file('avatar');
        $path = public_path('/upload/images');
        
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->move($path, $fileName);
        $avatar = 'upload/images/' . $fileName;
        $t->avatar = $avatar;
    } else { // Thêm phần xử lý khi không có ảnh mới
        $t->avatar = $t->avatar; // Giữ nguyên ảnh cũ
    }
    $t->save();

    return redirect('/Categories/List');
}

//xóa danh mục
public function Delete($id){
    $t = Categories::find($id);
    \App\Models\Music_cate::where('id_categories', $t->id)->delete();
    if($t==null) return redirect('/thongbao')->with('Thông báo danh mục không tồn tại');
    $t->delete();
    return redirect('/Categories/List');
}

}


