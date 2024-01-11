<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;

class StripeController extends Controller
{
    public function handlePaymentSuccess(Request $request)
    {
        try {
            Log::info('Webhook Data:', $request->all());

            $userId = $request->input('user_id');
            $user = User::find($userId);

            if (!$user) {
                Log::error('User not found. User ID: ' . $userId);
                return response()->json(['success' => false, 'message' => 'User not found.'], 404);
            }

            $user->status = 2;
            $user->save();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            $user->status = 3;
            Log::error('Error: ' . $e->getMessage());

            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function statistical()
    {
        return Inertia::render('Admin/manager/Statistical');
    }

    public function getStripeTransactions()
    {
        try {
            $apiKey = env('STRIPE_SECRET');
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
            ])->get('https://api.stripe.com/v1/charges');

            $data = $response->json();

            $transactions = isset($data['data']) && is_array($data['data']) ? $data['data'] : [];

            return response()->json([
                'success' => true,
                'transactions' => $transactions,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function getDailyStripeTransactions(Request $request)
    {
        try {
            $apiKey = env('STRIPE_SECRET');

            $startDate = $request->input('start_date', now()->subDays(7)->format('Y-m-d'));
            $endDate = $request->input('end_date', now()->format('Y-m-d'));


            $startTimestamp = strtotime($startDate);
            $endTimestamp = strtotime($endDate);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
            ])->get('https://api.stripe.com/v1/charges', [
                        'created[gte]' => $startTimestamp,
                        'created[lte]' => $endTimestamp,
                    ]);

            $data = $response->json();

            $transactions = isset($data['data']) && is_array($data['data']) ? $data['data'] : [];

            return response()->json([
                'success' => true,
                'transactions' => $transactions,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
