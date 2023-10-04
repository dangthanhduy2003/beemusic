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
        Schema::create('music_cate', function (Blueprint $table) {
            $table->primary(['id_music','id_categories']);
            $table->integer('id_music')->unsigned();
            $table->integer('id_categories')->unsigned();
            // khóa ngoại
        
            $table->foreign('id_music')->references('id_music')->on('music');
            $table->foreign('id_categories')->references('id_categories')->on('categories');

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
