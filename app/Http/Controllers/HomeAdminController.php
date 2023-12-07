<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use App\Models\Home;
use Illuminate\Http\Request;
use Inertia\Inertia;
class HomeAdminController extends Controller
{
    public function ListHome(){
        $home = Home::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/home/ListHome', ['home' => $home]);
    }
}
