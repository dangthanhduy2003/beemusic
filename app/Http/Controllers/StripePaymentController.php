<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Product as StripeProduct;
use Illuminate\Support\Facades\Log;


class StripePaymentController extends Controller
{
    public function createProduct(Request $request)
    {
        // Thiết lập API key của bạn từ Stripe Dashboard
        Stripe::setApiKey(config('services.stripe.secret'));

        // Dữ liệu của sản phẩm, bạn có thể nhận từ request hoặc đặt cứng tùy vào nhu cầu của bạn
        $productName = $request->input('name', 'New Product');
        $productType = $request->input('type', 'service'); // Có thể là 'service', 'good', 'sku' tùy thuộc vào loại sản phẩm của bạn

        try {
            // Tạo sản phẩm trên Stripe
            $product = StripeProduct::create([
                'name' => $productName,
                'type' => $productType,
            ]);

            return response()->json(['product_id' => $product->id]);
        } catch (\Exception $e) {
            // Xử lý lỗi, ví dụ log và trả về thông báo lỗi
            Log::error("Error creating product on Stripe: {$e->getMessage()}");
            return response()->json(['error' => 'Failed to create product on Stripe'], 500);
        }
    }
}
