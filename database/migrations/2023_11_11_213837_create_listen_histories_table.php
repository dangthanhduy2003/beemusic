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
        Schema::create('listen_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id'); // Use unsigned modifier
            $table->unsignedInteger('song_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('song_id')->references('id')->on('music');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('listen_histories');
    }
};
