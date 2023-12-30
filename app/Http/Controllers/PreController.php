<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Music;
use Inertia\Inertia;

class PreController extends Controller
{
    public function songLicense()
    {
        $songLicense = Music::where('license', 1)->get();
        return Inertia::render('Admin/manager/License', ['songLicense' => $songLicense]);
    }

}
