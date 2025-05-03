<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LoanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('customers', CustomerController::class);

    Route::resource('genres', GenreController::class);

    Route::resource('books', BookController::class);

    Route::resource('loans', LoanController::class);

    Route::post('/loans/{loan}/return', [LoanController::class, 'return']);
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
