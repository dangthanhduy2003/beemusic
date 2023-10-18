<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\MusicController;
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

Route::get('/category', function () {
    return Inertia::render('Client/Category', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/history', function () {
    return Inertia::render('Client/History', [
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
Route::get('/admin/danhsach',[UserController::class,'index']);
//them uset
Route::get('/admin/them',[UserController::class,'them']);
Route::post('/admin/them',[UserController::class,'them_']);
Route::get('/admin/xoa/{id}',[UserController::class,'xoa']);
Route::get('/admin/capnhat/{id}',[UserController::class,'capnhat']);
Route::post('/admin/capnhat/{id}',[UserController::class,'capnhat_']);


//hiển thị danh mục
Route::get('/Categories/List',[CategoriesController::class,'Index']);
Route::get('/Categories/Add',[CategoriesController::class,'Add']);
Route::post('/Categories/Add',[CategoriesController::class,'Add_']);
Route::get('/Categories/Delete/{id}',[CategoriesController::class,'Delete']);
Route::get('/Categories/Update/{id}',[CategoriesController::class,'Update']);
Route::post('/Categories/Update/{id}',[CategoriesController::class,'Update_']);
//music
Route::get('/Music/List',[MusicController::class,'Index']);
Route::get('/Music/Add',[MusicController::class,'Add']);
Route::post('/Music/Add',[MusicController::class,'Add_']);
Route::get('/Music/Update/{id}',[MusicController::class,'Update']);
Route::post('/Music/Update/{id}',[MusicController::class,'Update_']);
Route::get('/Music/Delete/{id}',[MusicController::class,'Delete']);


require __DIR__ . '/auth.php';
