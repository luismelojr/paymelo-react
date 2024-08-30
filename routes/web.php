<?php

use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Dash\ConfigController;
use App\Http\Controllers\Dash\NotificationController;
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
});

require __DIR__.'/auth.php';
