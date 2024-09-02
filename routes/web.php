<?php

use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Dash\AccountController;
use App\Http\Controllers\Dash\ConfigController;
use App\Http\Controllers\Dash\NotificationController;
use App\Http\Controllers\Dash\ProfileController;
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

Route::middleware(['auth'])->group(function () {
    // Config
    Route::get('/config', [ConfigController::class, 'show'])->name('config.show');
    Route::patch('/config/{config}', [ConfigController::class, 'updateValues'])->name('config.update.values');

    // Notification
    Route::get('/notification', [NotificationController::class, 'show'])->name('notification.show');
    Route::patch('/notification/{notification}', [NotificationController::class, 'update'])->name('notification.update.values');

    // Profile
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile', [ProfileController::class, 'updatePassword'])->name('profile.update.password');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Bank Account
    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts.index');
    Route::post('/accounts', [AccountController::class, 'store'])->name('accounts.store');
    Route::delete('/accounts/{account}', [AccountController::class, 'destroy'])->name('accounts.destroy');
});

require __DIR__.'/auth.php';
