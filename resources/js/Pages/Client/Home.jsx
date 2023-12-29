import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import { useMusic } from "./components/MusicContext";

export default function Home({
    auth,
    music,
    artist,
    musicByCategory,
    musicCategory,
    nameHome,
    lyrics,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();
    const isLoggedIn = auth.user !== null;

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const playMusic = (song) => {
        const selectedCategory = song.music_cates[0].id_categories;
        const songsInSelectedCategory = music.filter(
            (item) => item.music_cates[0].id_categories === selectedCategory
        );
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
                <div className="lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            {nameHome[0].name}
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {music.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-row relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-16 rounded"
                                >
                                    <img
                                        src={`../upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-16 lg:h-16 w-20 object-cover"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-base">
                                            {item.name}
                                        </span>
                                        {isLoggedIn && (
                                            <span className="ml-20">
                                                <a
                                                    href={`../upload/audio/${item.link_file}`}
                                                    download={`${item.link_file}`}
                                                    className="flex items-center text-blue-500 hover:underline mt-1 cursor-pointer"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-blue-500 hover:underline cursor-pointer ml-16"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                        />
                                                    </svg>
                                                </a>
                                            </span>
                                        )}
                                    </div>
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
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Nghệ sĩ thịnh hành
                        </h1>
                        <div className="grid grid-cols-3 w-full lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            {artist.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    className="grid justify-items-center text-center h-24 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:gap-y-2 lg:rounded-lg lg:w-44 lg:h-52"
                                >
                                    <Link
                                        href={`/songArtist/${item.id}`} // Sửa thành href
                                    >
                                        <img
                                            src={`../upload/images/${item.avatar}`}
                                            alt=""
                                            className="rounded-lg lg:rounded-full object-cover lg:h-36 w-28 h-20 lg:w-36 lg:mt-4 lg:mb-2"
                                        />
                                        <span className="text-sm lg:text-base font-medium">
                                            {item.name}
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            {nameHome[1].name}
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicByCategory.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-row relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-16 rounded"
                                >
                                    <img
                                        src={`../upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-16 lg:h-16 w-20 object-cover"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-base">
                                            {item.name}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="flex-shrink-0 pr-2">
                                                <span className="font-thin lg:text-sm text-neutral-300">
                                                    {item.artist}
                                                </span>
                                            </span>
                                            <span className="ml-20">
                                                <a
                                                    href={`../upload/audio/${item.link_file}`}
                                                    download={`${item.link_file}`}
                                                    className="flex items-center text-blue-500 hover:underline mt-1 cursor-pointer"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-blue-500 hover:underline cursor-pointer ml-16"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                        />
                                                    </svg>
                                                </a>
                                            </span>
                                        </span>

                                        <span className="font-thin lg:text-sm text-neutral-300"></span>
                                    </div>
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
                    <section className="mt-2 mb-2 text-white lg:mb-0">
                        <h1 className="lg:text-xl text-base font-bold">
                            {nameHome[2].name}
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicCategory.slice(0, 6).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex flex-row relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-16 rounded"
                                >
                                    <img
                                        src={`../upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-16 lg:h-16 w-20 object-cover"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-base">
                                            {item.name}
                                        </span>
                                        <span className="flex items-center">
                                            <span className="flex-shrink-0 pr-2">
                                                <span className="font-thin lg:text-sm text-neutral-300">
                                                    {item.artist}
                                                </span>
                                            </span>
                                            <span className="ml-20">
                                                <a
                                                    href={`../upload/audio/${item.link_file}`}
                                                    download={`${item.link_file}`}
                                                    className="flex items-center text-blue-500 hover:underline mt-1 cursor-pointer"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6 text-blue-500 hover:underline cursor-pointer ml-16"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                        />
                                                    </svg>
                                                </a>
                                            </span>
                                        </span>
                                    </div>
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
