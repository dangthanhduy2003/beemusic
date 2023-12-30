<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wallet', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id')->unique();
            $table->unsignedInteger('balance')->default(0);
            $table->unsignedInteger('deposit_amount')->default(0);
            $table->unsignedInteger('withdraw_amount')->default(0);
            $table->unsignedInteger('payment_data_id')->nullable();
            $table->tinyInteger('status')->unsigned()->default(0);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_data_id')->references('id')->on('payment_data')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallet');
    }
};
