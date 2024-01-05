<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe;
use Exception;

class StripePaymentController extends Controller
{
    public function stripePost(Request $request)
    {
        try {
            $stripe = new \Stripe\StripeClient(
                env('STRIPE_SECRET')
            );
            $res = $stripe->tokens->create([
                'card' => [
                    'number' => $request->number,
                    'exp_month' => $request->exp_month,
                    'exp_year' => $request->exp_year,
                    'cvc' => $request->cvc,
                ],
            ]);

            Stripe\Stripe::setApiKey(
                env('STRIPE_SECRET')
            );

            $response = $stripe->charges->create([
                'amount' => $request->amount,
                'currency' => 'usd',
                'source' => $request->id,
            ]);
            return response()->json([$response->status], 201);
        } catch (Exception $ex) {
            return response()->json(['response' => 'Error'], 500);
        }
    }
}
