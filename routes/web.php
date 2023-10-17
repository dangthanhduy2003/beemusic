<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('Client/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/charts', function () {
    return Inertia::render('Client/Charts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




//hien thị ds user
Route::get('/admin/danhsach', [UserController::class, 'index'])->name('admin.listuser');
//them user
Route::get('/admin/them', [UserController::class, 'them']);
Route::post('/admin/them', [UserController::class, 'them_']);
Route::get('/admin/xoa/{id}', [UserController::class, 'xoa']);
Route::get('/admin/capnhat/{id}', [UserController::class, 'capnhat']);
Route::post('/admin/capnhat/{id}', [UserController::class, 'capnhat_']);


//hiển thị danh mục
Route::get('/categories/danhsach', [CategoriesController::class, 'index']);
Route::get('/categories/them', [CategoriesController::class, 'them']);
Route::post('/categories/them', [CategoriesController::class, 'them_']);
Route::get('/categories/xoa/{id}', [CategoriesController::class, 'xoa']);
Route::get('/categories/capnhat/{id}', [CategoriesController::class, 'capnhat']);
Route::post('/categories/capnhat/{id}', [CategoriesController::class, 'capnhat_']);
require __DIR__ . '/auth.php';
