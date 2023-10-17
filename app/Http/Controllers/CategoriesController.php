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
public function index(){
    $perpage = 3;
    $data = Categories::orderBy('created_at', 'desc')->paginate($perpage);
    return view('categories/DsCategories', ['data' => $data]);
}

// thêm dữ liệu danh mục
function them(){
    $data = \App\Models\categories::all();
    return view('categories/ThemCategories',['data'=>$data]);
}
 // lưu lại dữ liệu thêm
 public function them_(Request $request){
    $t = new Categories;
    $t->name = $request->input('name');
    $t->save();

    return redirect('/categories/danhsach');
}


 //cập nhật Danh mục
 function capnhat($id){
    $categories = Categories::find($id);
    if($categories==null) return redirect('/thongbao');
    return view("/categories/CnCategories",['categories'=>$categories]);
}

public function capnhat_(Request $request, $id)
{
    $t = Categories::find($id);

    if (!$t) {
        return redirect('/thongbao');
    }

    $t->name = $request->input('name');
    $t->save();

    return redirect('/categories/danhsach');
}

}
