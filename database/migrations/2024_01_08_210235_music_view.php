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
        Schema::create('music_view', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_music')->unsigned();
            $table->integer('view')->unsigned();
            $table->timestamps();
            // khóa ngoại
        
            $table->foreign('id_music')->references('id')->on('music');

            
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
