<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentData extends Model
{

    public function index()
    {
        $paymentData = PaymentData::all();
        return response()->json($paymentData);
    }

    protected $table = 'payment_data';

    protected $fillable = [
        'order_id', 'order_desc', 'order_type', 'amount', 'language', 'bank_code', 'user_id', 'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
