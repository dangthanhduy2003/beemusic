import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function PlayList() {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch, state } = useMusic();

    const playMusic = (song) => {
        const selectedCategory = song.music_cates[0].id_categories;
        const songsInSelectedCategory = state.songsInSelectedCategory.filter(
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
            <DefaultLayout>
                <div className="mt-2 text-xs text-white lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold">
                        Danh sách phát
                    </h1>
                    <table class="table-auto w-full text-left mt-2">
                        <tbody className="text-white text-base">
                            {state.songsInSelectedCategory.map(
                                (item, index) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => playMusic(item)}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        className={`relative group ${
                                            item.isCurrent
                                                ? "text-green-500"
                                                : ""
                                        }`}
                                    >
                                        <td>{index + 1}</td>
                                        <td className="flex justify-center my-2">
                                            <img
                                                src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                                alt=""
                                                className="rounded-lg lg:w-20 lg:h-20 w-20 object-cover"
                                            />
                                            {isHovered && (
                                                <button
                                                    onClick={() =>
                                                        playMusic(item)
                                                    }
                                                    className="hidden group-hover:block absolute top-1/2 left-14 transform -translate-x-1/2 -translate-y-1/2"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-14 h-14 stroke-none"
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
                                        </td>
                                        <td>
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
