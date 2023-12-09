import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function PlayList({ auth }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch, state } = useMusic();

    const playMusic = (song) => {
        const selectedCategory =
            song.music_cates && song.music_cates.length > 0
                ? song.music_cates[0].id_categories
                : null;
        const songsInSelectedCategory = state.songsInSelectedCategory.filter(
            (item) => item.music_cates[0].id_categories === selectedCategory
        );

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

    useEffect(() => {
        const storedState = localStorage.getItem("musicPlayerState");

        if (storedState) {
            const parsedState = JSON.parse(storedState);
            // Cập nhật trạng thái từ localStorage
            dispatch({
                type: "RESTORE_STATE",
                musicPlayerState: parsedState,
            });
        }
    }, []);

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
                    <table class="table-auto w-full text-left mt-2">
                        <tbody className="text-white lg:text-base text-sm">
                            {state.songsInSelectedCategory.map(
                                (item, index) => (
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
                                            <span className="group-hover:hidden">
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
                                                        className="w-16 h-16 stroke-none"
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
                                                className="rounded-lg lg:w-16 lg:h-16 w-20 h-20 object-cover"
                                            />
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
