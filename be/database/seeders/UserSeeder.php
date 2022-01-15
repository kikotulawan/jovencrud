<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'fname' => 'Ezikiel',
            'lname' => 'Tulawan',
            'email' => 'kiko@gmail.com',
            'password' => Hash::make('123123'),
        ]);

        Task::create([
            'title' => 'Setup vue project',
            'description' => 'Set up vue project and install all required dependancies',
            'status' => 'pending',
            'user_id' => $user->id,
        ]);
    }
}
