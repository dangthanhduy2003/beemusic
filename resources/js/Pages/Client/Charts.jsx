import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";
import { Link } from "@inertiajs/react";

export default function Charts({ auth, musics, lyrics }) {
    const [isHovered, setIsHovered] = useState(false);
    const [sortedMusics, setSortedMusics] = useState([]);
    const [topSongImage, setTopSongImage] = useState("");
    const isLoggedIn = auth.user !== null;
    const { dispatch } = useMusic();

    useEffect(() => {
        // Sắp xếp mảng bài hát theo lượt view giảm dần
        const sorted = [...musics].sort((a, b) => b.view - a.view);
        setSortedMusics(sorted);

        // Lấy đường dẫn ảnh từ bài hát đầu tiên trong danh sách
        if (sorted.length > 0) {
            const topSongImage = `../upload/images/${sorted[0].thumbnail}`;
            setTopSongImage(topSongImage);
        }
    }, [musics]);

    const playMusic = (song) => {
        const songsInSelectedCategory = [...sortedMusics];
        // Sử dụng filter để lọc ra các lời bài hát với id_music bằng selectedSongId
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

                    <div
                        className="flex items-center gap-5 w-full h-52 rounded text-white
                    bg-gradient-to-b from-slate-500 from-10%"
                    >
                        <img
                            src={`${topSongImage} `}
                            className="w-44 h-44 object-cover rounded ml-14"
                            alt=""
                        />
                        <div>
                            <span className="text-gray-400 text-sm">
                                Playlist
                            </span>
                            <h1 className="text-4xl font-bold">
                                BXH bài hát được nghe nhiều nhất
                            </h1>
                            <div className="mt-2 font-semibold">
                            <button className="border border-solid rounded-full  hover:bg-teal-400	 p-2">
                                <a href="/chartsMonth">TOP MONTH</a>
                            </button>
                            <button className="ml-4 border border-solid rounded-full  hover:bg-cyan-400 p-2">
                                <a href="/chartsDay">TOP DAY</a>
                            </button>
                            </div>

                        </div>
                    </div>

                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr className="border-b text-sm text-neutral-500 border-neutral-600">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-4/12 text-left">Tiêu đề</th>
                                <th className="lg:w-1/12 text-left">Nghệ sĩ</th>
                                <th className="lg:w-5/12 text-center">
                                    Lượt phát
                                </th>
                                <th className="lg:w-1/12">
                                    <div className="flex justify-start">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-10"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-white lg:text-sm text-sm">
                            {sortedMusics.slice(0, 20).map((item, index) => (
                                <tr
                                    key={item.id}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className={`hover:bg-gradient-to-t relative group from-teal-950 ${
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
                                    <td className="flex flex-row items-center gap-3 text-left">
                                        <img
                                            src={`../upload/images/${item.thumbnail}`}
                                            alt=""
                                            className="rounded-lg lg:w-14 lg:h-14 w-14 h-14 object-cover my-2"
                                        />
                                        <span className="font-semibold">
                                            {item.name}
                                        </span>
                                    </td>
                                    <td className="text-sm">
                                        <span>{item.artist}</span>
                                    </td>
                                    <td className="text-sm text-center">
                                        <span>{item.view}</span>
                                    </td>
                                    <td>
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
