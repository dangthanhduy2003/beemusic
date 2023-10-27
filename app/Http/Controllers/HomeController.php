<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
namespace App\Http\Controllers;
use App\Models\Music;
use App\Models\Categories;
use App\Models\Music_cate;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
class HomeController extends Controller
{
     //hiển thị toàn bộ danh sách ra trang chủ
     public function ListHome()
     {
         //kiểm tra xem nếu là admin thì hiện tất cả và nếu là user thì hiện chỉ trang của user đó thêm
             $music = Music::orderBy('created_at', 'desc')->get();
         return Inertia::render('Client/Home', ['music' => $music]);
     }
}
