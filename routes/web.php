<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MusicController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FavoriteSongController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\HomeAdminController;
use Inertia\Inertia;
use App\Http\Controllers\PaymentDataController;
use App\Http\Controllers\ArtistController;
use Monolog\Processor\HostnameProcessor;
use App\Http\Controllers\PreController;

//thêm phân quyền
Route::group(['middleware' => 'admin'], function () {
    // Các route yêu cầu quyền admin
});

Route::get('/', [HomeController::class, 'ListHome'], function () {
    return Inertia::render('Client/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/charts', [HomeController::class, 'Charts'])->name('charts');

Route::get('/category', [HomeController::class, 'ListCate'], function () {
    return Inertia::render('Client/Category', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Nhạc bản quyền
Route::get('/check-permission', [PreController::class, 'checkPre'])->name('check.permission');
Route::get('/license', [PreController::class, 'songLicense'])->name('license.list');


// premium
Route::group(['middleware' => 'auth'], function () {
    Route::get('/premium', [PaymentDataController::class, 'premium']);
    Route::post('/api/payment/store', [PaymentDataController::class, 'store']);
    Route::get('/get-all-transactions', [PaymentDataController::class, 'getAllTransactions']);
    Route::get('/SuccessfulTransaction', [PaymentDataController::class, 'SuccessfulTransaction'])->name('manager.success');
    Route::get('/RefuseTransaction', [PaymentDataController::class, 'RefuseTransaction'])->name('manager.refuse');
    Route::get('/PendingTransaction', [PaymentDataController::class, 'PendingTransaction'])->name('manager.pending');
    Route::post('/api/update-transaction-status', [PaymentDataController::class, 'updateTransactionStatus']);
});


Route::get('/users-with-status-two', [PreController::class, 'getUsersWithStatusTwo']);



//hiển thị bài hát gần đây
Route::group(['middleware' => 'auth'], function () {
    Route::post('/save-song-history', [HistoryController::class, 'saveSongHistory']);
    Route::get('/song-history', [HistoryController::class, 'getSongHistory']);
    Route::post('/listen-history/add', [HistoryController::class, 'addToListenHistory']);
});


// hiển thị danh sách, thêm và xóa bài hát yêu thích
Route::group(['middleware' => 'auth'], function () {
    Route::post('/favorite-song/add', [FavoriteSongController::class, 'addFavoriteSong']);
    Route::get('/favorite-songs', [FavoriteSongController::class, 'listFavoriteSongs']);
    Route::get('/favorite-song', [FavoriteSongController::class, 'FavoriteSongs']);
    Route::delete('/favorite-songs/{id}', [FavoriteSongController::class, 'deleteFavoriteSong']);
});

//hiển thị bài hát theo categories
Route::get('/songCate/{id}', [HomeController::class, 'MusicCate'], function () {
    return Inertia::render('Client/History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
//hiển thị bài hát theo ca sĩ
Route::get('/songArtist/{id}', [HomeController::class, 'MusicArtist'], function () {
    return Inertia::render('Client/History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//hiển thị bài nhạc của album
Route::get('/songAlbum/{id}', [HomeController::class, 'MusicAlbum'], function () {
    return Inertia::render('Client/History', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// hiển thị thông tin liên hệ
Route::get('/hotline', function () {
    return Inertia::render('Client/HotLine');
});
//đăng nhập vào admin

// thong ke nghe si

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user-music-info', [ArtistController::class, 'getUserMusicInfo'])
        ->name('dashboard');
    Route::get('/get-total-view', [ArtistController::class, 'getTotalView'])
        ->name('dashboard');
});


Route::get('/dashboard', [PaymentDataController::class, 'getDashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');


Route::get('/dashboard-data', [ArtistController::class, 'getTopViewedUsers'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard.data');

Route::get('/artist/{id}', [ArtistController::class, 'detailArtist']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//hiển thị thông tin người dùng để sửa
Route::get('/editacc', [UserController::class, 'showUser'], function () {
    return Inertia::render('Profile/Account');
});
//update thong tin nguoi dung
Route::post('/editUser/{id}', [UserController::class, 'editUser'], function () {
    return Inertia::render('Profile/Account');
});
// check mật khẩu xem có đúng với mật khẩu cũ hay không
Route::post('/checkCurrentPassword/{id}', [UserController::class, 'checkCurrentPassword']);
//update password
Route::post('/updatePassword/{id}', [UserController::class, 'updatePassword'], function () {
    return Inertia::render('Profile/Account');
});
//tài khoản người dùng tự xóa tài khoản
//update password
Route::get('/deleteUser/{id}', [UserController::class, 'deleteUser'], function () {
    return Inertia::render('Profile/Account');
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
Route::get('/music/add', [MusicController::class, 'Add'])->name('music.add');
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
Route::get('/album/listMusic/{id}', [AlbumController::class, 'listMusic', 'addMusicAlbum'])->name('album.listMusic');
Route::post('/album/addMusicAlbum/{id}', [AlbumController::class, 'addMusicAlbum'])->name('album.addMusicAlbum');
Route::get('/album/DeleteMusic/{id}/{id_album}', [AlbumController::class, 'DeleteMusic'])->name('album.deleteMusic');

//Hiển thị ra trang chủ
Route::get('/lyrics', [HomeController::class, 'LyricId'])->name('lyrics');
Route::get('/playlist', [HomeController::class, 'getSongsWithSameCategory'])->name('playlist');
//hàm tìm kiếm trang home
Route::get('/search', [HomeController::class, 'search'])->name('searchs');
Route::post('/view/{id}', [HomeController::class, 'updateView'])->name('view');

//trang hiển thị danh sách thêm nhạc vào giao diện home
Route::get('/home/listHome', [HomeAdminController::class, 'ListHome'])->name('home.listHome');
//hiển thị bài nhạc của album
Route::get('/home/listMusic/{id}', [HomeAdminController::class, 'listMusic'])->name('home.listMusic');
Route::get('/home/update/{id}', [HomeAdminController::class, 'Update'])->name('home.up');
Route::post('/home/update/{id}', [HomeAdminController::class, 'UpdateHome'])->name('home.update');
//
Route::post('/home/addMusicHome/{id}', [HomeAdminController::class, 'addMusicHome'])->name('home.addMusicHome');
Route::get('/home/DeleteMusicHome/{id}/{id_home}', [HomeAdminController::class, 'DeleteMusicHome'])->name('home.DeleteMusicHome');
require __DIR__ . '/auth.php';
