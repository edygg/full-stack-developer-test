<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('automobile_types')->insert([
            'type' => 'official',
            'display_name' => 'Oficial'
        ]);

        DB::table('automobile_types')->insert([
            'type' => 'resident',
            'display_name' => 'Residente'
        ]);

        DB::table('automobile_types')->insert([
            'type' => 'visitor',
            'display_name' => 'Visitante'
        ]);
    }
}
