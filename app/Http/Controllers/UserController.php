<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;

Paginator::useBootstrap();
class UserController extends Controller
{
    // hiển thị danh sách khách hàng
    public function index()
    {
        // $perpage = 3;
        // $data = User::paginate($perpage);
        $role = Role::all();
        $data = User::all();
        return Inertia::render('Admin/ListUser', ['data' => $data, 'role' => $role]);
    }
    //hiển thị form
    function them()
    {
        $role = \App\Models\Role::all();
        return view('admin/ThemUser', ['role' => $role]);
    }
    //thêm user
    // lưu lại dữ liệu thêm
    public function them_(Request $request)
    {
        $t = new User;
        $t->name = $request->input('name');
        $t->email = $request->input('email');
        $t->password = $request->input('password');
        $t->id_role = $request->input('id_role');
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

        return redirect('/admin/danhsach');
    }

    //cập nhật user
    function capnhat($id)
    {
        $user = User::find($id);
        if ($user == null) return redirect('/thongbao');
        $role = \App\Models\Role::all();
        return view("/admin/CnUser", ['user' => $user, 'role' => $role]);
    }
    public function capnhat_(Request $request, $id)
    {
        $t = User::find($id);

        if (!$t) {
            return redirect('/thongbao');
        }

        $t->name = $request->input('name');
        $t->email = $request->input('email');
        $t->password = $request->input('password');
        $t->id_role = $request->input('id_role');
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

        return redirect('/admin/danhsach');
    }


    //xóa khách hàng  theo id
    function xoa($id)
    {
        $t = User::find($id);
        if ($t == null) return redirect('/thongbao')->with('Thông báo khách hàng không tồn tại');
        $t->delete();
        return redirect('/admin/danhsach');
    }


    //thông báo khi null
    function thongbao()
    {
        return view('thongbao');
    }
}
