import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function Charts({ auth, musics }) {
    const [isHovered, setIsHovered] = useState(false);
    const [sortedMusics, setSortedMusics] = useState([]);
    const { dispatch } = useMusic();

    useEffect(() => {
        // Sắp xếp mảng bài hát theo lượt view giảm dần
        const sorted = [...musics].sort((a, b) => b.view - a.view);
        setSortedMusics(sorted);
    }, [musics]);

    const playMusic = (song) => {
        const songsInSelectedCategory = [...sortedMusics];
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

    const getColorClass = (index) => {
        switch (index) {
            case 0:
                return "text-red-600";
            case 1:
                return "text-cyan-500";
            case 2:
                return "text-green-500";
            default:
                return "";
        }
    };

    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
                        Bảng xếp hạng
                    </h1>
                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr className="border-b-2 text-white border-neutral-600">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-1/12"></th>
                                <th className="lg:w-4/12 text-left">Tiêu đề</th>
                                <th className="lg:w-3/12 text-left">Nghệ sĩ</th>
                                <th className="hidden lg:block">Lượt phát</th>
                            </tr>
                        </thead>
                        <tbody className="text-white lg:text-base text-sm">
                            {sortedMusics.slice(0, 20).map((item, index) => (
                                <tr
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className={`hover:bg-gradient-to-t from-teal-950 ${
                                        item.isCurrent ? "text-green-500" : ""
                                    } ${index < 3 ? getColorClass(index) : ""}`}
                                >
                                    <td className="relative group text-center">
                                        <span className="group-hover:hidden">
                                            {index + 1}
                                        </span>
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
                                                    className="w-14 h-14 stroke-none"
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
                                    <td className="flex justify-center my-2">
                                        <img
                                            src={`../upload/images/${item.thumbnail}`}
                                            alt=""
                                            className="rounded-lg lg:w-16 lg:h-16 w-14 h-14 object-cover"
                                        />
                                    </td>
                                    <td className="text-left">
                                        <span>{item.name}</span>
                                    </td>
                                    <td className="text-left">
                                        <span>{item.artist}</span>
                                    </td>
                                    <td className="hidden lg:block text-center">
                                        <span>{item.view}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DefaultLayout>
        </>
    );
}
