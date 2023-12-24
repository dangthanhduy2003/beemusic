<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentData;
use Inertia\Inertia;


class PaymentDataController extends Controller
{

    public function premium()
    {
        return Inertia::render('Client/payments/Premium');
    }

    public function ListPayment()
    {
        $paymentData = PaymentData::with('user')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/manager/PaymentTransaction', ['paymentData' => $paymentData]);
    }



    public function store(Request $request)
    {
        try {
            $user_id = auth()->id();
            $order_id = uniqid();
            $order_type = $request->input('order_type');
            $amount = $request->input('amount');
            $modal = $request->input('modal');

            // Lưu dữ liệu thanh toán
            PaymentData::create([
                'order_id' => $order_id,
                'order_type' => $order_type,
                'amount' => $amount,
                'user_id' => $user_id
            ]);

            // Thêm logic xử lý thông tin thanh toán vào đây (ví dụ: gửi thông báo, cập nhật trạng thái, ...)

            return response()->json(['success' => 'Thanh toán thành công']);
        } catch (\Exception $e) {
            // Xử lý lỗi nếu có
            return response()->json(['error' => 'Đã có lỗi xảy ra trong quá trình xử lý thanh toán'], 500);
        }
    }

}
