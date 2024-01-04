import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function SongHistory({ auth, songHistory, lyrics }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const playMusic = (song) => {
        const songs = songHistory.map((item) => item.song);
        const songsInSelectedCategory = [...songs];
        const selectedSongId = song.id;
        // Sử dụng filter để lọc ra các lời bài hát với id_music bằng selectedSongId
        const lrc = lyrics.filter((lyric) => lyric.id_music === selectedSongId);
        // Sắp xếp danh sách bài hát
        const sortedSongs = [...songsInSelectedCategory].sort((a, b) => {
            // Bài hát đang được phát nằm đầu tiên
            if (a.id === song.id) return -1;
            if (b.id === song.id) return 1;
            return 0;
        });
        const updatedSongs = sortedSongs.map((item) => ({
            ...item,
            isCurrent: item.id === song.id,
        }));

        const musicPlayerState = {
            currentSong: song,
            lrc: lrc,
            songsInSelectedCategory: updatedSongs,
        };

        dispatch({
            type: "PLAY",
            song,
            songsInSelectedCategory: updatedSongs,
            lrc,
        });
        localStorage.setItem(
            "musicPlayerState",
            JSON.stringify(musicPlayerState)
        );
    };
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
                        Đã nghe gần đây
                    </h1>
                    {Array.isArray(songHistory) && songHistory.length > 0 ? (
                        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            {songHistory.map((song) => (
                                <div
                                    key={song.id}
                                    onClick={() => playMusic(song.song)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-col items-center relative group bg-neutral-700 lg:hover:bg-zinc-700 rounded-lg lg:w-44 lg:h-56 w-28 h-60"
                                >
                                    <img
                                        src={`../upload/images/${song.song.thumbnail}`}
                                        alt={song.song.name}
                                        className="lg:w-40 lg:h-36 w-28 h-24 rounded-lg object-cover mt-2"
                                    />
                                    <div className="text-white text-center mt-2">
                                        <span className="block font-semibold text-sm">
                                            {song.song.name}
                                        </span>
                                        <span className="text-sm">
                                            {song.song.artist}
                                        </span>
                                    </div>
                                    {isHovered && (
                                        <button
                                            onClick={() => playMusic(item)}
                                            className="hidden group-hover:block absolute top-1/3 left-20 transform -translate-x-1/2 -translate-y-1/2"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-16 h-16 stroke-none"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="fill-green-600"
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="fill-black"
                                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-3xl mt-3 text-center text-red-600">
                            Bạn đã chưa có bài hát nào vừa nghe!
                        </div>
                    )}
                </div>
            </DefaultLayout>
        </>
    );
}
