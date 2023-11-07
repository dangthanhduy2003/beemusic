<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Monolog\Processor\HostnameProcessor;

Route::get('/', [HomeController::class, 'ListHome'], function () {
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

Route::get('/category',[HomeController::class, 'ListCate'], function () {
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

Route::get('/musicCate/{id}',[HomeController::class, 'MusicCate'], function () {
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
//hiển thị avatarr ở search

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//hien thị ds user
Route::get('/user/list', [UserController::class, 'ListAccount'])->name('user.list');
//them user
Route::post('/user/add', [UserController::class, 'AddAccount'])->name('user.add');
Route::get('/user/delete/{id}', [UserController::class, 'DelUser'])->name('user.delete');
Route::get('/user/update/{id}', [UserController::class, 'Update'])->name('user.up');
Route::post('/user/updated/{id}', [UserController::class, 'UpdateUser'])->name('user.update');

//hiển thị danh mục
Route::get('/categories/list', [CategoriesController::class, 'ListCate'])->name('categories.list');
Route::post('/categories/add', [CategoriesController::class, 'AddCate'])->name('categories.add');
Route::get('/categories/delete/{id}', [CategoriesController::class, 'Delete'])->name('categories.delete');
Route::get('/categories/update/{id}', [CategoriesController::class, 'Update'])->name('categories.up');
Route::post('/categories/updated/{id}', [CategoriesController::class, 'UpdateCate'])->name('categories.update');
//music
Route::get('/music/list', [MusicController::class, 'ListMusic'])->name('music.list');
Route::post('/music/add', [MusicController::class, 'AddMusic'])->name('music.add');
Route::get('/music/update/{id}', [MusicController::class, 'Update'])->name('music.up');
Route::post('/music/update/{id}', [MusicController::class, 'UpdateMusic'])->name('music.update');
Route::get('/music/delete/{id}', [MusicController::class, 'Delete'])->name('music.delete');
//album
Route::get('/album/list', [AlbumController::class, 'ListAlbum'])->name('album.list');
Route::post('/album/add', [AlbumController::class, 'AddAlbum'])->name('album.add');
Route::get('/album/update/{id}', [AlbumController::class, 'Update'])->name('album.up');
Route::post('/album/update/{id}', [AlbumController::class, 'UpdateAlbum'])->name('album.update');
Route::get('/album/delete/{id}', [AlbumController::class, 'Delete'])->name('album.delete');
//hiển thị bài nhạc của album
Route::get('/album/listMusic/{id}', [AlbumController::class, 'listMusic','addMusicAlbum'])->name('album.listMusic');
Route::post('/album/addMusicAlbum/{id}', [AlbumController::class, 'addMusicAlbum'])->name('album.addMusicAlbum');
Route::get('/album/DeleteMusic/{id}/{id_album}', [AlbumController::class, 'DeleteMusic'])->name('album.deleteMusic');
//Hiển thị ra trang chủ

require __DIR__ . '/auth.php';
