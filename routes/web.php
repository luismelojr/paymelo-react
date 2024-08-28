<?php

use App\Http\Controllers\Auth\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Social route
Route::get('/oauth/login/google', [SocialController::class, 'redirectToGoogleProvider'])->name('oauth.google');
Route::get('/oauth/google/callback', [SocialController::class, 'handleGoogleProviderCallback'])->name('oauth.google.callback');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
