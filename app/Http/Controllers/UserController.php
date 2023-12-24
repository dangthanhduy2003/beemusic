<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Album_music;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

Paginator::useBootstrap();
class UserController extends Controller
{

    //
    public function index()
    {
        $user = auth()->user(); // Lấy thông tin người dùng đã đăng nhập

        // Truyền dữ liệu user vào trang
        return Inertia::render('Client/components/Header', [
            'user' => $user,
        ]);
    }
    //thêm sửa ảnh cho user khi đăng nhập
    public function userRole()
    {
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
        //check lỗi user đã tồn tại hay chưa
        // Kiểm tra xem email đã tồn tại chưa
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'id_role' => 'required',
            // Thêm các quy tắc kiểm tra khác nếu cần
        ], [
            'email.unique' => 'Email đã tồn tại', // Thông báo lỗi cho trường hợp email đã tồn tại
            // Thêm các thông báo lỗi tùy chỉnh khác nếu cần
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->password = $request->input('password');
        $user->id_role = $request->input('id_role');
        // Xử lý tải lên ảnh đại diện (tương tự như mã hiện tại của bạn)
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
        // Kiểm tra xem email đã tồn tại chưa, ngoại trừ email của chính user hiện tại
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'id_role' => 'required',
            // Thêm các quy tắc kiểm tra khác nếu cần
        ], [
            'email.unique' => 'Email đã tồn tại', // Thông báo lỗi cho trường hợp email đã tồn tại
            // Thêm các thông báo lỗi tùy chỉnh khác nếu cần
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
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

    //hiển thị tên và hình ra trang chủ home
    public function showUserHome()
    {

        $user = Auth::user();
        $show = User::find($user->id);
        return Inertia::render("Profile/Edit", ['show' => $show]);
    }
    //sửa user của tài khoản thường
    public function showUser()
    {

        $user = Auth::user();
        $show = User::find($user->id);
        return Inertia::render("Profile/Account", ['show' => $show]);
    }
    public function editUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required',
            'email' => [
                'sometimes',
                'required',
                'email',
                Rule::unique('users')->ignore($id),
            ],
        ], [
            'name.required' => 'Vui lòng nhập tên người dùng',
            'email.required' => 'Vui lòng nhập địa chỉ email',
            'email.email' => 'Địa chỉ email không hợp lệ',
            'email.unique' => 'Địa chỉ email đã được sử dụng bởi người dùng khác',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Logic xử lý khi không có lỗi
        $userToUpdate = User::find($id);

        if (!$userToUpdate) {
            return response()->json(['errors' => ['user' => ['Người dùng không tồn tại']]], 422);
        }

        // Kiểm tra xem người dùng đã nhập dữ liệu mới hay không
        $userData = [
            'name' => $request->input('name', $userToUpdate->name), // Nếu không nhập tên mới, giữ nguyên tên cũ
            'email' => $request->input('email', $userToUpdate->email), // Nếu không nhập email mới, giữ nguyên email cũ
        ];

        // Cập nhật thông tin người dùng
        $userToUpdate->update($userData);

        // Xử lý ảnh
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');

            $path = public_path('/upload/images');
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            // Lưu ảnh vào thư mục public/upload/images
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('/upload/images'), $fileName);

            // Cập nhật đường dẫn của ảnh trong cơ sở dữ liệu
            $userToUpdate->update(['avatar' => $fileName]);
        }

        return response()->json(['success' => 'Thông tin người dùng đã được cập nhật thành công']);
    }

    //sửa mật khẩu
    public function updatePassword(Request $request, $id)
    {
        // Kiểm tra mật khẩu mới có giống mật khẩu cũ không
        if ($request->input('password') === $request->input('newPassword')) {
            return response()->json(['errors' => ['newPassword' => ['Mật khẩu mới không được giống mật khẩu cũ']]], 422);
        }

        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'newPassword' => 'required|min:8',
            'confirmPassword' => 'required|same:newPassword',
        ], [
            'password.required' => 'Mật khẩu hiện tại không được bỏ trống',
            'newPassword.required' => 'Mật khẩu mới không được bỏ trống',
            'newPassword.min' => 'Mật khẩu mới phải có ít nhất 8 ký tự',
            'confirmPassword.required' => 'Nhập lại mật khẩu không được bỏ trống',
            'confirmPassword.same' => 'Mật khẩu nhập lại phải giống mật khẩu mới',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Logic xử lý khi không có lỗi
        $user = auth()->user();  // Lấy thông tin người dùng hiện tại (đã đăng nhập)

        // Kiểm tra mật khẩu hiện tại
        if (!password_verify($request->input('password'), $user->password)) {
            return response()->json(['errors' => ['password' => ['Mật khẩu hiện tại không đúng']]], 422);
        }

        // Lấy user cần cập nhật
        $userToUpdate = User::find($id);

        // Kiểm tra xem user có tồn tại không
        if (!$userToUpdate) {
            return response()->json(['errors' => ['user' => ['Người dùng không tồn tại']]], 422);
        }

        // Cập nhật mật khẩu mới
        $userToUpdate->update([
            'password' => bcrypt($request->input('newPassword')),
        ]);

        return response()->json(['success' => 'Mật khẩu đã được cập nhật thành công']);
    }

    //người dùng tự xóa tài khoản
    public function deleteUser($id)
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

        return redirect('/');
    }
}
