<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra xem người dùng có quyền quản trị không
        if ($request->user() && $request->user()->isAdmin()) {
            return $next($request);
        }

        // Nếu không có quyền, chuyển hướng hoặc xử lý theo nhu cầu của bạn
        return redirect('/LoginUser')->with('error', 'You do not have admin access.');

    }
}
