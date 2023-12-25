<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PaymentData;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;


class PaymentDataController extends Controller
{

    public function statisticalPremium()
    {
        // Lấy danh sách thanh toán hoàn thành (status = 2)
        $statisticalPremium = PaymentData::with('user')
            ->where('status', 2)
            ->orderBy('created_at', 'desc')
            ->get();

        // Lấy doanh thu từ tất cả các thanh toán
        $revenueData = $statisticalPremium->pluck('amount');
        $revenueTotal = $revenueData->sum();

        // Lấy doanh thu trong 15 ngày gần nhất
        $last15DaysRevenue = PaymentData::where('status', 2)
            ->where('created_at', '>=', now()->subDays(15))
            ->sum('amount');

        return Inertia::render('Admin/Dashboard', [
            'statisticalPremium' => $statisticalPremium,
            'revenueTotal' => $revenueTotal,
            'last15DaysRevenue' => $last15DaysRevenue,
        ]);
    }
    public function premium()
    {
        return Inertia::render('Client/payments/Premium');
    }

    public function PendingTransaction()
    {
        $paymentData = PaymentData::with('user')
            ->where('status', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/manager/PendingTransaction', ['paymentData' => $paymentData]);
    }

    public function RefuseTransaction()
    {
        $paymentData = PaymentData::with('user')
            ->where('status', 4)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/manager/PendingTransaction', ['paymentData' => $paymentData]);
    }

    public function SuccessfulTransaction()
    {
        $paymentData = PaymentData::with('user')
            ->where('status', 2)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/manager/PendingTransaction', ['paymentData' => $paymentData]);
    }

    public function updateTransactionStatus(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'transaction_id' => 'required|exists:payment_data,id', // Chuyển đổi thành transaction_id
                'new_status' => 'required|in:2,4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
            }

            $paymentData = PaymentData::findOrFail($request->transaction_id); // Chuyển đổi thành transaction_id
            $paymentData->status = $request->new_status;
            $paymentData->save();

            return response()->json(['success' => true, 'message' => 'Transaction status updated successfully']);
        } catch (\Exception $e) {
            Log::error('Error updating transaction status: ' . $e->getMessage());
            return response()->json(['error' => 'Error updating transaction status'], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            $user_id = auth()->id();
            $order_id = uniqid();
            $order_type = $request->input('order_type');

            // Loại bỏ ký tự không phải số từ giá trị amount
            $amount = preg_replace('/[^0-9]/', '', $request->input('amount'));

            // Chuyển đổi giá trị amount thành kiểu số
            $amount = (float) $amount;

            // Begin database transaction
            DB::beginTransaction();

            $payment = PaymentData::create([
                'order_id' => $order_id,
                'order_type' => $order_type,
                'amount' => $amount,
                'user_id' => $user_id
            ]);

            // Update the status column to 1
            $payment->update(['status' => 1]);

            // Commit the transaction
            DB::commit();

            // Thêm logic xử lý thông tin thanh toán vào đây (ví dụ: gửi thông báo, cập nhật trạng thái, ...)

            return response()->json(['success' => 'Thanh toán thành công']);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollback();

            // Xử lý lỗi nếu có
            Log::error('Lỗi trong quá trình xử lý thanh toán: ' . $e->getMessage());
            return response()->json(['error' => 'Đã có lỗi xảy ra trong quá trình xử lý thanh toán'], 500);
        }
    }

}
