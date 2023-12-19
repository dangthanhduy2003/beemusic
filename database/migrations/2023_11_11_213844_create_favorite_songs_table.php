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
        Schema::create('favorite_songs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('song_id')->unsigned();
            $table->timestamps();

            $table->foreign('song_id')->references('id')->on('music');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorite_songs');
    }
};
