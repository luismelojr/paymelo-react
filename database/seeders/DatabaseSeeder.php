<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::factory()->create([
            'name' => 'Luis Henrique',
            'email' => 'junimhs10@gmail.com',
            'phone' => '62982296415',
            'password' => bcrypt('junior'),
            'is_admin' => true,
        ]);

        $user->config()->create();
    }
}
