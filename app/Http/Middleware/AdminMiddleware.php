<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        // Kiểm tra xem người dùng có quyền admin hay không
        if (Auth::check() && Auth::user()->id_role == '1') {
            return $next($request);
        }
        // Nếu không có quyền, bạn có thể chuyển hướng hoặc trả về lỗi 403 (tùy thuộc vào yêu cầu của bạn)
        return redirect('/'); // Chuyển hướng về trang chính, bạn có thể thay đổi thành trang khác
    }
}
