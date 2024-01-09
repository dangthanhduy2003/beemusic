<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class StripeController extends Controller
{
    public function handlePaymentSuccess(Request $request)
    {
        try {
            // Log thông tin nhận được từ request
            Log::info('Webhook Data:', $request->all());

            // Lấy user_id từ request
            $userId = $request->input('user_id');

            // Kiểm tra xem có tồn tại người dùng với user_id được cung cấp hay không
            $user = User::find($userId);

            if (!$user) {
                // Log lỗi khi không tìm thấy người dùng
                Log::error('User not found. User ID: ' . $userId);

                return response()->json(['success' => false, 'message' => 'User not found.'], 404);
            }

            // Cập nhật cột status của người dùng thành 2
            $user->status = 2;
            $user->save();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // Log lỗi khi có ngoại lệ xảy ra
            Log::error('Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
