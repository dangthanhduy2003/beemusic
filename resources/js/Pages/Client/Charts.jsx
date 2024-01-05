import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function Charts({ auth, musics, lyrics }) {
    const [isHovered, setIsHovered] = useState(false);
    const [sortedMusics, setSortedMusics] = useState([]);
    const [topSongImage, setTopSongImage] = useState("");
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
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-10"
                                        >
                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                        </svg>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-white lg:text-sm text-sm">
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
