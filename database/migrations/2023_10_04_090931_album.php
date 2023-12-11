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
        Schema::create('album', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name_album');
            $table->date('year');
            $table->integer('id_user')->unsigned();
            $table->string('avatar');
            $table->timestamps();

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
