import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function MusicAlbum({ auth, musicList, album, lyrics }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();
    const isLoggedIn = auth.user !== null;

    const playMusic = (song) => {
        const songsInSelectedCategory = [...musicList];

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
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold">
                            {album.name_album}
                        </h1>
                        <h1 className="lg:text-xl text-base font-bold">
                            Bài hát
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicList.map((item) => (
                                <div
                                    key={item.id}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-row items-center justify-between relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-16 rounded"
                                >
                                    <div className="flex flex-row">
                                        <img
                                            src={`../upload/images/${item.thumbnail}`}
                                            alt=""
                                            className="rounded-l-lg lg:w-16 lg:h-16 w-20 object-cover"
                                        />
                                        <div className="flex flex-col p-2 ml-2">
                                            <span className="font-semibold lg:text-base">
                                                {item.name}
                                            </span>
                                            <span className="font-thin lg:text-sm text-neutral-300">
                                                {item.artist}
                                            </span>
                                        </div>
                                    </div>
                                    {isLoggedIn && (
                                        <a
                                            href={`../upload/audio/${item.link_file}`}
                                            download={`${item.link_file}`}
                                            className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                />
                                            </svg>
                                        </a>
                                    )}
                                    {isHovered && (
                                        <button
                                            onClick={() => playMusic(item)}
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
                            ))}
                        </div>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
