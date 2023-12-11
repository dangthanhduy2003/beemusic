<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class home extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('home')->insert([
			[
				'name' => 'Những bản nhạc đang thịnh hành',
				
			],
			[
				'name' => 'Những bản nhạc Chill',
				
			],
			[
				'name' => 'Những bản nhạc sôi động',
				
			]
		]);
    }
}
