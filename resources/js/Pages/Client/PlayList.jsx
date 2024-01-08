import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function PlayList({ auth }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch, state } = useMusic();
    const isLoggedIn = auth.user !== null;

    const playMusic = (song) => {
        const songsInSelectedCategory = state.songsInSelectedCategory;

        // Di chuyển bài hát đã được phát nếu có, xuống cuối danh sách
        const indexOfCurrentlyPlaying = songsInSelectedCategory.findIndex(
            (item) => item.isCurrent
        );

        if (indexOfCurrentlyPlaying !== -1) {
            const currentlyPlayingSong = songsInSelectedCategory.splice(
                indexOfCurrentlyPlaying,
                1
            )[0];
            songsInSelectedCategory.push(currentlyPlayingSong);
        }

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

        dispatch({ type: "PLAY", song, songsInSelectedCategory: updatedSongs });
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
                <div className="mt-2 text-xs text-white lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold">
                        Danh sách phát
                    </h1>
                    <div>
                        <h2 className="text-base text-gray-400 font-semibold">
                            Đang phát
                        </h2>
                        <div className="w-full mb-8">
                            {state.songsInSelectedCategory.map(
                                (item, index) =>
                                    item.isCurrent && (
                                        <div
                                            key={item.id}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className="flex justify-between items-center gap-3 relative group 
                                            text-sm text-green-500 hover:bg-gradient-to-t from-teal-950 cursor-pointer p-2"
                                        >
                                            <div className="flex flex-row items-center gap-5">
                                                <div className="relative group w-8 text-center">
                                                    <span className="group-hover:hidden text-sm">
                                                        {index + 1}
                                                    </span>
                                                    {isHovered && (
                                                        <button
                                                            onClick={() =>
                                                                playMusic(item)
                                                            }
                                                            className="hidden group-hover:block absolute top-1/2 left-4 transform -translate-x-1/2 -translate-y-1/2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-12 h-12 stroke-none"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="fill-green-500"
                                                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex flex-row gap-5 items-center">
                                                    <img
                                                        src={`../upload/images/${item.thumbnail}`}
                                                        alt=""
                                                        className="rounded-lg lg:w-14 lg:h-14 w-14 h-14 object-cover"
                                                    />
                                                    <span className="font-semibold">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span>{item.artist}</span>
                                            </div>
                                            <div className="flex flex-row justify-start items-center gap-5">
                                                <span>{item.time}</span>
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
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-base text-gray-400 font-semibold">
                            Danh sách chờ
                        </h2>
                        <div className="w-full">
                            {state.songsInSelectedCategory.map(
                                (item, index) =>
                                    !item.isCurrent && (
                                        <div
                                            key={item.id}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className="flex justify-between items-center gap-3 relative group 
                                        text-sm hover:bg-gradient-to-t from-teal-950 cursor-pointer p-2"
                                        >
                                            <div className="flex flex-row items-center gap-5">
                                                <div className="relative group w-8 text-center">
                                                    <span className="group-hover:hidden text-sm">
                                                        {index + 1}
                                                    </span>
                                                    {isHovered && (
                                                        <button
                                                            onClick={() =>
                                                                playMusic(item)
                                                            }
                                                            className="hidden group-hover:block absolute top-1/2 left-4 transform -translate-x-1/2 -translate-y-1/2"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="w-12 h-12 stroke-none"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="fill-green-500"
                                                                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex flex-row gap-5 items-center">
                                                    <img
                                                        src={`../upload/images/${item.thumbnail}`}
                                                        alt=""
                                                        className="rounded-lg lg:w-14 lg:h-14 w-14 h-14 object-cover"
                                                    />
                                                    <span className="font-semibold">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span>{item.artist}</span>
                                            </div>
                                            <div className="flex flex-row justify-start items-center gap-5">
                                                <span>{item.time}</span>
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
                                            </div>
                                        </div>
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
