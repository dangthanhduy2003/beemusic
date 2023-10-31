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
        Schema::create('album_music', function (Blueprint $table) {
            $table->primary(['id_album','id_music']);
            $table->integer('id_album')->unsigned();
            $table->integer('id_music')->unsigned();
            $table->timestamps();
            // khóa ngoại
            $table->foreign('id_album')->references('id')->on('album');
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
