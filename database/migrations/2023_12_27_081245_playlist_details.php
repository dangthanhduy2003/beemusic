<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('playlist_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_playlist')->constrained('playlists');
            $table->unsignedInteger('id_music');
            $table->foreign('id_music')->references('id')->on('music');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('playlist_details');
    }
};
