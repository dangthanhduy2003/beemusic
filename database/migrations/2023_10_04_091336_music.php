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
        Schema::create('music', function (Blueprint $table) {
            $table->increments('id_music');
            $table->string('name');
            $table->string('link_file');
            $table->string('thumbnail');
            $table->string('view');
            $table->text('lyrics');
            $table->integer('id_artist')->unsigned();
            $table->timestamps();
            // khóa ngoại
        $table->foreign('id_artist')->references('id_artist')->on('artist');
        
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
