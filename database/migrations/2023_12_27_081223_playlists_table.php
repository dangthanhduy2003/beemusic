<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('playlists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('playlists');
    }
};
