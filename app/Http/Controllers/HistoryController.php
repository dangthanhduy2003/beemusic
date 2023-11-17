<?php

namespace App\Http\Controllers;

use App\ListenHistory;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function getListenHistory(Request $request)
    {
        $listenHistory = ListenHistory::all();

        if ($request->has('song_id')) {
            $songId = $request->input('song_id');
            $this->saveListenHistory($songId);
        }

        return response()->json($listenHistory);
    }

    private function saveListenHistory($songId)
    {
        ListenHistory::create([
            'song_id' => $songId,
        ]);
    }
}
