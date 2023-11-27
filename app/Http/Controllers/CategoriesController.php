<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Music_cate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Support\Str;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    // hiển thị danh sách danh mục

    // Thêm hàm tìm kiếm vào danh sách danh mục


    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $categories = Categories::search($searchTerm)->get();

        return Inertia::render('Admin/categories/ListCategories', ['categories' => $categories]);
    }





    public function ListCate()
    {
        $categories = Categories::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/categories/ListCategories', ['categories' => $categories]);
    }

    // lưu lại dữ liệu thêm
    public function AddCate(Request $request)
    {
        // Kiểm tra xem danh mục đã tồn tại hay chưa
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            //Thêm các quy tắc kiểm tra khác nếu cần
        ], [
            'name.unique' => 'Thể loại này đã tồn tại',
            'avatar.required' => 'Vui lòng chọn ảnh.',
            'avatar.image' => 'Tệp tin phải là ảnh.',
            'avatar.mimes' => 'Định dạng ảnh phải là jpeg, png, jpg, gif, hoặc svg.',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $categories = new Categories;
        $categories->name = $request->input('name');
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
            $categories->avatar = $avatar;
        }
        $categories->save();

        return redirect('/categories/list');
    }

    //cập nhật Danh mục
    public function Update($id)
    {
        $categories = Categories::find($id);
        return Inertia::render('Admin/categories/EditCate', ['categories' => $categories]);
    }

    public function updateCate(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|unique:categories,name,' . $id,
            'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // Thêm các quy tắc kiểm tra khác nếu cần
        ], [
            'name.required' => 'Tên thể loại không được để trống.',
            'name.unique' => 'Thể loại này đã tồn tại',
            'avatar.image' => 'Tệp tin phải là ảnh.',
            'avatar.mimes' => 'Định dạng ảnh phải là jpeg, png, jpg, gif, hoặc svg.',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Tìm thể loại theo $id
        $categories = Categories::find($id);
    
        // Cập nhật tên nếu khác với tên hiện tại
        if ($request->filled('name') && $request->input('name') !== $categories->name) {
            $categories->name = $request->input('name');
        }
    
        // Lưu thông tin thể loại đã cập nhật vào cơ sở dữ liệu
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = public_path('upload/images');
    
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
    
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move($path, $fileName);
            $avatar = $fileName;
    
            // Kiểm tra xem ảnh mới có khác với ảnh hiện tại không
            if ($avatar !== $categories->avatar) {
                // Nếu khác, thì lưu ảnh mới
                $categories->avatar = $avatar;
            }
        }
    
        $categories->save();
    
        return redirect('/categories/list');

    }
    //xóa danh mục
    public function Delete($id)
    {
        $categories = Categories::find($id);
        $avatarPath = public_path('upload/images/' . $categories->avatar);

        // Kiểm tra xem tệp tồn tại trước khi xóa
        if (file_exists($avatarPath)) {
            // Xóa tệp tin
            unlink($avatarPath);
        }

        Music_cate::where('id_categories', $categories->id)->delete();
        $categories->delete();
        return redirect('/categories/list');
    }
}
