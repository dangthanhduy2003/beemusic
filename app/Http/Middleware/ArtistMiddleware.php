<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ArtistMiddleware
{
    public function handle($request, Closure $next)
    {
        // Kiểm tra xem người dùng có id_role là 3 và 1 hay không có nghĩa là nghệ sĩ và amdin có thể vào
        if (Auth::check() && Auth::user()->id_role == 3||Auth::user()->id_role ==1) {
            return $next($request);
        }

        return redirect('/'); // Chuyển hướng về trang chính, bạn có thể thay đổi thành trang khác
    }
}
