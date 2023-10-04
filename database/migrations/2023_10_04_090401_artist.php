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
        Schema::create('artist', function (Blueprint $table) {
            $table->increments('id_artist');
            $table->string('name');
            $table->string('image')->nullable();
            $table->integer('id_user')->unsigned();
            $table->text('description')->nullable();
            $table->timestamps();

            // khóa ngoại
        $table->foreign('id_user')->references('id_user')->on('users');
        
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
