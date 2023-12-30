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
            $table->increments('id');
            $table->string('name');
            $table->string('link_file');
            $table->string('thumbnail');
            $table->string('view');
            $table->integer('id_user')->unsigned();
            $table->string('artist');
            $table->timestamps();
            $table->unsignedInteger('price')->nullable();
            $table->tinyInteger('license')->unsigned()->nullable();
            // khóa ngoại
            $table->foreign('id_user')->references('id')->on('users');
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
