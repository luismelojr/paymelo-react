<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    public function __construct(
        private UserService $userService
    ) {
    }

    public function redirectToGoogleProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleProviderCallback()
    {
        try {
            $userGoogle = Socialite::driver('google')->user();
            $data       = [
                'name'      => $userGoogle->name,
                'email'     => $userGoogle->email,
                'google_id' => $userGoogle->id,
            ];

            $user = $this->userService->loginUserWithGoogle($data);
            Auth::login($user);
            return redirect()->intended(route('dashboard', absolute: false));
        } catch (\Exception $e) {
            // Tratar as exceções
            return redirect()->route('login');
        }
    }
}
