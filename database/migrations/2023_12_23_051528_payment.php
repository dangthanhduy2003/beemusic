<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_data', function (Blueprint $table) {
            $table->id();
            $table->string('order_id')->unique();
            $table->string('order_desc');
            $table->integer('order_type')->unsigned()->default(1);
            $table->decimal('amount', 10, 2);
            $table->string('language');
            $table->string('bank_code')->nullable();
            $table->unsignedInteger('user_id');
            // Khóa ngoại
            $table->foreign('order_type')->references('id')->on('order_type');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->tinyInteger('status')->default(0); // 0: Chưa mua, 1: Đã mua
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_data');
    }
};
