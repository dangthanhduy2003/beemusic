<?php
// HistoryController.php
namespace App\Http\Controllers;

use App\Models\ListenHistory;
use App\Models\Music;
use App\Models\Lyrics;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function saveSongHistory(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated.'], 401);
        }

        $userId = $user->id;
        $songId = $request->input('song_id');

        $this->trimSongHistory($userId);

        ListenHistory::create([
            'user_id' => $userId,
            'song_id' => $songId,
        ]);

        return response()->json(['message' => 'Bài hát đã được thêm vào lịch sử nghe gần đây.']);
    }

    public function getSongHistory()
    {
        $userId = auth()->user()->id;
        $songHistory = ListenHistory::where('user_id', $userId)->with('song')->orderBy('created_at', 'desc')->get();
        // Tạo một mảng chứa id của từng bài hát trong lịch sử nghe nhạc
        $songIds = $songHistory->pluck('song.id')->toArray();

        // Lấy lời bài hát dựa trên id của từng bài hát trong bảng music
        $lyrics = Lyrics::whereIn('id_music', $songIds)->get();
        return Inertia::render('Client/SongHistory', ['songHistory' => $songHistory, 'lyrics' => $lyrics]);
    }

    private function trimSongHistory($userId)
    {
        $songHistoryCount = ListenHistory::where('user_id', $userId)->count();

        if ($songHistoryCount >= 15) {
            $oldestRecord = ListenHistory::where('user_id', $userId)
                ->orderBy('created_at')
                ->first();

            if ($oldestRecord) {
                $oldestRecord->delete();
            }
        }
    }

    public function addToListenHistory(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated.'], 401);
        }

        $userId = $user->id;
        $songId = $request->input('song_id');

        $this->trimSongHistory($userId);

        // Kiểm tra xem bài hát đã có trong lịch sử nghe chưa
        $existingEntry = ListenHistory::where('user_id', $userId)
            ->where('song_id', $songId)
            ->first();

        if (!$existingEntry) {
            // Nếu chưa có, thêm vào lịch sử nghe
            ListenHistory::create([
                'user_id' => $userId,
                'song_id' => $songId,
            ]);
        }

        return response()->json(['message' => 'Bài hát đã được thêm vào lịch sử nghe gần đây.']);
    }
}
