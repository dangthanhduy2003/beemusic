<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Music;
use Inertia\Inertia;
use App\Models\Lyrics;


class PreController extends Controller
{
    public function songLicense()
    {
        $userStatus = auth()->user()->status;
        $songLicense = Music::where('license', 1)->get();
        $musicIds = $songLicense->pluck('id')->toArray();
        $lyrics = Lyrics::whereIn('id_music', $musicIds)->get();
        return Inertia::render('Client/License', ['songLicense' => $songLicense, 'userStatus' => $userStatus, 'lyrics' => $lyrics]);
    }


}
