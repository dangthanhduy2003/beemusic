<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Product as StripeProduct;
use Stripe\Price;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function showCreateProductForm()
    {
        return Inertia::render('Admin/PremiumPGK');
    }

    public function createProduct(Request $request)
    {
        // Thiết lập API key của bạn từ Stripe Dashboard
        Stripe::setApiKey(config('services.stripe.secret'));

        // Dữ liệu của sản phẩm từ request
        $productName = $request->input('name', 'New Product');
        $productType = $request->input('type', 'service');
        $productDescription = $request->input('description', 'Product description');
        $productImage = $request->input('image', null);
        $productDuration = $request->input('duration', 1);

        try {
            // Tạo sản phẩm trên Stripe
            $product = StripeProduct::create([
                'name' => $productName,
                'type' => $productType,
            ]);

            // Tạo giá cho sản phẩm
            $price = Price::create([
                'product' => $product->id,
                'unit_amount' => $this->calculatePrice($productDuration),
                'currency' => 'usd',
                'recurring' => [
                    'interval' => 'month',
                    'interval_count' => $productDuration,
                ],
            ]);
            $product->update([
                'description' => $productDescription,
                'images' => $productImage ? [$productImage] : null,
            ]);

            return response()->json(['product_id' => $product->id, 'price_id' => $price->id]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create product on Stripe'], 500);
        }
    }

    public function getProducts()
    {
        // Gọi API của Stripe để lấy danh sách sản phẩm
        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $products = StripeProduct::all();
            $formattedProducts = [];

            foreach ($products as $product) {
                $formattedProducts[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'description' => $product->description,
                    'price' => $this->getProductPrice($product->id),
                    'image' => $this->getProductImage($product),
                    'priceId' => $this->getProductPriceId($product->id), // Thêm dòng này
                ];
            }

            // Sử dụng Inertia.js để truyền dữ liệu xuống trang React
            return Inertia::render('Client/Buy', ['products' => $formattedProducts]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch products from Stripe'], 500);
        }
    }

    public function redirectToCheckout(Request $request)
    {
        $productId = $request->input('product_id');
        $priceId = $request->input('price_id');

        // Truyền thông tin sản phẩm và giá vào view thanh toán
        return Inertia::render('Client/Checkout', [
            'productId' => $productId,
            'priceId' => $priceId,
        ]);
    }

    private function getProductImage($product)
    {
        // Kiểm tra xem sản phẩm có hình ảnh không và trả về URL của hình ảnh
        if (!empty($product->images)) {
            return $product->images[0];
        }

        return null;
    }

    private function getProductPriceId($productId)
    {
        try {
            $prices = Price::all(['product' => $productId]);

            if (!empty($prices->data[0])) {
                return $prices->data[0]->id;
            } else {
                return null;
            }
        } catch (\Exception $e) {
            return null;
        }
    }

    private function getProductPrice($productId)
    {
        try {
            $prices = Price::all(['product' => $productId]);

            if (!empty($prices->data[0])) {
                return $prices->data[0]->unit_amount_decimal / 100;
            } else {
                return 0;
            }
        } catch (\Exception $e) {
            return 0;
        }
    }


    public function showCheckout(Request $request, $productId, $priceId)
    {
        // Truyền thông tin sản phẩm và giá vào view thanh toán
        return Inertia::render('Client/Checkout', [
            'productId' => $productId,
            'priceId' => $priceId,
        ]);
    }

    // app/Http/Controllers/StripeController.php
    public function processPayment(Request $request)
    {
        $token = $request->input('token');
        $productId = $request->input('productId');
        $priceId = $request->input('priceId');

        // Thực hiện xử lý thanh toán ở đây, sử dụng $token, $productId và $priceId

        return response()->json(['success' => true]);
    }


    private function calculatePrice($duration)
    {
        switch ($duration) {
            case 1:
                return 1000;
            case 3:
                return 2700;
            case 6:
                return 4800;
            default:
                return 0;
        }
    }
}
