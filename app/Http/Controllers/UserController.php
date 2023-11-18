<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Album_music;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Paginator::useBootstrap();
class UserController extends Controller
{

    //thêm sửa ảnh cho user khi đăng nhập
    public function userRole(){
        
    }
    //tìm kiếm
    public function search(Request $request)
    {
        // Lấy giá trị từ ô tìm kiếm
        $searchTerm = $request->input('search');

        // Tìm kiếm người dùng theo tên hoặc email
        $users = User::where('name', 'like', "%$searchTerm%")
                     ->orWhere('email', 'like', "%$searchTerm%")
                     ->orderBy('created_at', 'desc')
                     ->get();

        // Lấy danh sách quyền
        $roles = Role::all();

        // Trả về view với dữ liệu tìm kiếm
        return Inertia::render('Admin/users/ListUser', ['user' => $users, 'role' => $roles]);
    }
    // hiển thị danh sách khách hàng
    public function ListAccount()
    {
        $user = User::orderBy('created_at', 'desc')->get();
        $role = Role::all();
        return Inertia::render('Admin/users/ListUser', ['user' => $user, 'role' => $role]);
    }

    //thêm user
    // lưu lại dữ liệu thêm
    public function AddAccount(Request $request)
    {
        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->id_role = $request->input('id_role');
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
            $avatar = $fileName;
            // Lưu đường dẫn vào cơ sở dữ liệu
            $user->avatar = $avatar;
        }

        $user->save();

        return redirect('/user/list');
    }
    //cập nhật user
    public function Update($id)
    {
        $user = User::find($id);
        $role = Role::all();
        return Inertia::render("Admin/users/EditUser", ['user' => $user, 'role' => $role]);
    }

    public function UpdateUser(Request $request, $id)
    {
        $user = User::find($id);
        $password =  User::find($id);
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        if ($request->filled('password')) {
            if (empty($request->password)) {
                $user->password = $password->password;
            } else {
                // Trường password có giá trị khác rỗng

                $user->password = $request->input('password');
            }
        } else {
            // Trường password không được gửi trong yêu cầu
            // Thực hiện hành động tùy ý ở đây
        }
        $user->id_role = $request->input('id_role');
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = public_path('/upload/images');

            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $fileName);
            $avatar = $fileName;
            $user->avatar = $avatar;
        } else { // Thêm phần xử lý khi không có ảnh mới
            $user->avatar = $user->avatar; // Giữ nguyên ảnh cũ
        }

        $user->save();

        return redirect('/user/list');
    }

    //xóa khách hàng  theo id
    public function DelUser($id)
    {
        $user = User::find($id);
        $avatarPath = public_path('upload/images/' . $user->avatar);

        // Tạm vô hiệu hóa ràng buộc khóa ngoại
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Xóa tất cả dữ liệu liên quan
        Album::where('id_user', $user->id)->delete();
        Album_music::where('id_album', $user->id)->delete();
        $user->delete();

        // Bật lại ràng buộc khóa ngoại
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        return redirect('/user/list');
    }


    //hiển thị ảnh user ra form
    // public function avatar($id){
    //     $user = Auth::user();
    //     return Inertia::render('components/search', ['user' => $user]);
    // }
}
