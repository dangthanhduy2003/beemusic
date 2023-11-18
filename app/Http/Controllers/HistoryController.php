<?php

namespace App\Http\Controllers;

use App\Models\ListenHistory;
use Illuminate\Http\Request;

class SongHistoryController extends Controller
{
    /**
     * Lưu lịch sử nghe bài hát mới.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function saveSongHistory(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'song_id' => 'required|exists:music,id',
        ]);

        // Lấy dữ liệu từ request
        $userId = $request->input('user_id');
        $songId = $request->input('song_id');

        // Chèn bản ghi mới vào bảng listen_histories
        ListenHistory::create([
            'user_id' => $userId,
            'song_id' => $songId,
        ]);

        // Lấy số lượng bản ghi trong bảng
        $historyCount = ListenHistory::where('user_id', $userId)->count();

        // Nếu số lượng vượt quá 15, thì xóa bản ghi thứ 15
        if ($historyCount > 15) {
            $oldestRecord = ListenHistory::where('user_id', $userId)->orderBy('created_at')->first();
            if ($oldestRecord) {
                $oldestRecord->delete();
            }
        }

        return response()->json(['message' => 'Lịch sử nghe đã được cập nhật']);
    }

    /**
     * Lấy lịch sử bài hát gần đây của người dùng.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getRecentSongHistory(Request $request, $user_id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Lấy 15 bản ghi gần nhất từ bảng listen_histories
        $recentHistory = ListenHistory::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->take(15)
            ->get();

        return response()->json($recentHistory);
    }
}
