import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import TryListening from "./TryListening";
import { useMusic } from "./components/MusicContext";

export default function License({ auth, songLicense, lyrics }) {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();

    useEffect(() => {
        setSongs(songLicense);
    }, [songLicense]);

    const openModal = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    const playMusic = (song) => {
        const songsInSelectedCategory = [...songLicense];

        const lrc = lyrics;
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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="py-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-white">
                        <div className="flex flex-row justify-between">
                            <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
                                Nhạc bán bản quyền
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            {songs.map((song) => (
                                <React.Fragment key={song.id}>
                                    {auth.user.status !== 2 ? (
                                        <div className="max-w-sm mt-4 rounded overflow-hidden shadow-lg bg-gray-800">
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={`../upload/images/${song.thumbnail}`}
                                                    alt={song.name}
                                                />
                                            </div>
                                            <div className="px-6 py-2 flex flex-col items-center justify-center">
                                                <div className="font-bold text-xl text-white">
                                                    {song.name}
                                                </div>
                                                <span className="text-gray-500 text-sm">
                                                    {song.artist}
                                                </span>
                                                <button
                                                    className="mt-2 hover:text-blue-500"
                                                    onClick={() =>
                                                        openModal(song)
                                                    }
                                                >
                                                    Nghe thử
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className="flex flex-row items-center justify-between relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 rounded"
                                        >
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={`../upload/images/${song.thumbnail}`}
                                                    alt={song.name}
                                                />
                                            </div>
                                            <div className="px-6 py-2 flex flex-col items-center justify-center">
                                                <div className="font-bold text-xl text-white">
                                                    {song.name}
                                                </div>
                                                <span className="text-gray-500 text-sm">
                                                    {song.artist}
                                                </span>
                                            </div>
                                            {isHovered && (
                                                <button
                                                    onClick={() =>
                                                        playMusic(song)
                                                    }
                                                    className="hidden group-hover:block absolute top-1/2 left-8 transform -translate-x-1/2 -translate-y-1/2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-12 h-12 stroke-none"
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
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
            <TryListening
                isOpen={isModalOpen}
                onClose={closeModal}
                song={selectedSong}
            />
        </>
    );
}
