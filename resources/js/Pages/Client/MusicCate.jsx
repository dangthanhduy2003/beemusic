import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function MusicCate({ auth, musicCate, categories }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();

    const playMusic = (song) => {
        const selectedCategory = song.music_cates[0].id_categories;
        const songsInSelectedCategory = musicCate.filter(
            (item) => item.music_cates[0].id_categories === selectedCategory
        );
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
            songsInSelectedCategory: updatedSongs,
        };
        dispatch({ type: "PLAY", song, songsInSelectedCategory: updatedSongs });
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
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold">
                            {categories.name}
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicCate.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-row relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-24 object-cover"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-lg">
                                            {item.name}
                                        </span>
                                        <span className="font-thin lg:text-base">
                                            {item.artist}
                                        </span>
                                    </div>
                                    {isHovered && (
                                        <button
                                            onClick={() => playMusic(item)}
                                            className="hidden group-hover:block absolute top-1/2 left-12 transform -translate-x-1/2 -translate-y-1/2"
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
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
