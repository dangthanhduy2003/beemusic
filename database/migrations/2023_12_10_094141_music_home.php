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
        Schema::create('music_home', function (Blueprint $table) {
            $table->primary(['id_music','id_home']);
            $table->integer('id_music')->unsigned();
            $table->integer('id_home')->unsigned();
            $table->timestamps();
            // khóa ngoại
        
            $table->foreign('id_music')->references('id')->on('music');
            $table->foreign('id_home')->references('id')->on('home');
            
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
