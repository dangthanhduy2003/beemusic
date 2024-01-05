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
        //
        Schema::create('transaction', function (Blueprint $table) {
            $table->increments('id');
            $table->string('customer_name', 50);
            $table->string('customer_email', 50);
            $table->string('item_name');
            $table->string('item_number', 50);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('id_role')->unsigned()->default(2);
            $table->string('provider')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('provider_token')->nullable();
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->tinyInteger('status')->unsigned()->default(0);
            $table->foreign('id_role')->references('id')->on('role');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
