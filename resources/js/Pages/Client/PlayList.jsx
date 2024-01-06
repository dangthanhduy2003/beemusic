import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function PlayList({ auth }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch, state } = useMusic();

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
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">
                            Đang phát
                        </h2>
                        {state.songsInSelectedCategory.map(
                            (item, index) =>
                                item.isCurrent && (
                                    <div
                                        key={item.id}
                                        className="flex items-center text-green-500 space-x-2"
                                    >
                                        {/* Hiển thị thông tin bài hát đang phát */}
                                        <img
                                            src={`../upload/images/${item.thumbnail}`}
                                            alt=""
                                            className="w-8 h-8 object-cover rounded-lg"
                                        />
                                        <div>
                                            <p className="font-bold">
                                                {item.name}
                                            </p>
                                            <p>{item.artist}</p>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                    <h2>Danh sách chờ</h2>
                    <table class="table-auto w-full text-left mt-2">
                        <tbody className="text-white lg:text-sm text-sm">
                            {state.songsInSelectedCategory.map(
                                (item, index) =>
                                    !item.isCurrent && (
                                        <tr
                                            key={item.id}
                                            onClick={() => playMusic(item)}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className={`hover:bg-gradient-to-t from-teal-950 ${
                                                item.isCurrent
                                                    ? "text-green-500"
                                                    : ""
                                            }`}
                                        >
                                            <td className="relative group">
                                                <span className="group-hover:hidden text-sm">
                                                    {index + 1}
                                                </span>
                                                {isHovered && (
                                                    <button
                                                        onClick={() =>
                                                            playMusic(item)
                                                        }
                                                        className="hidden group-hover:block absolute top-1/2 left-1 transform -translate-x-1/2 -translate-y-1/2"
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
                                                                className="fill-green-500"
                                                                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                            </td>
                                            <td className="flex justify-center my-2 w-20 mx-2 lg:mx-0">
                                                <img
                                                    src={`../upload/images/${item.thumbnail}`}
                                                    alt=""
                                                    className="rounded-lg lg:w-14 lg:h-14 w-14 h-14 object-cover"
                                                />
                                            </td>
                                            <td className="font-semibold">
                                                <span>{item.name}</span>
                                            </td>
                                            <td>
                                                <span>{item.artist}</span>
                                            </td>
                                        </tr>
                                    )
                            )}
                        </tbody>
                    </table>
                </div>
            </DefaultLayout>
        </>
    );
}
