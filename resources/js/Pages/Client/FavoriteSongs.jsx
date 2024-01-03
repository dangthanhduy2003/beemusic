import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/inertia-react";
import Modal from "react-modal";
import { useMusic } from "./components/MusicContext";

export default function FavoriteSongs({ auth, favoriteSongs, lyrics }) {
    const [favoriteSongsState, setFavoriteSongs] = useState(favoriteSongs);
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { dispatch } = useMusic();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const playMusic = (song) => {
        const songs = favoriteSongs.map((item) => item.song);
        const songsInSelectedCategory = [...songs];
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/favorite-songs/${id}`);
            setIsModalOpen(true);
            // Đóng modal sau 3 giây (3000 miligiây)
            setTimeout(() => {
                setIsModalOpen(false);
            }, 1000);
            updateUIAfterDelete(id);
        } catch (error) {}
    };

    const updateUIAfterDelete = (deletedId) => {
        // Cập nhật giao diện người dùng để bỏ đi phần tử có id tương ứng
        setFavoriteSongs((prevSongs) =>
            prevSongs.filter((song) => song.id !== deletedId)
        );
    };

    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <h1 className="lg:text-2xl lg:fixed top-5 start-96 text-base font-bold text-white">
                        Bài hát yêu thích của bạn
                    </h1>

                    <table class="table-auto w-full mt-2">
                        <thead>
                            <tr className="border-b-2 text-neutral-500 border-neutral-600">
                                <th className="lg:w-1/12">#</th>
                                <th className="lg:w-1/12 w-20"></th>
                                <th className="lg:w-4/12 text-left">Tiêu đề</th>
                                <th className="lg:w-3/12 text-left">Nghệ sĩ</th>
                                <th className="lg:w-3/12">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="text-white lg:text-base text-sm">
                            {Array.isArray(favoriteSongsState) &&
                            favoriteSongsState.length > 0 ? (
                                favoriteSongsState.map(
                                    (favoriteSong, index) => (
                                        <tr
                                            key={favoriteSong.id}
                                            onClick={() =>
                                                playMusic(favoriteSong.song)
                                            }
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className="hover:bg-gradient-to-t from-teal-950"
                                        >
                                            <td className="relative group text-center">
                                                <span className="group-hover:hidden">
                                                    {index + 1}
                                                </span>
                                                {isHovered && (
                                                    <button
                                                        onClick={() =>
                                                            playMusic(
                                                                favoriteSong.song
                                                            )
                                                        }
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
                                                    src={`../upload/images/${favoriteSong.song.thumbnail}`}
                                                    alt=""
                                                    className="rounded-lg lg:w-16 lg:h-16 w-14 h-14 object-cover"
                                                />
                                            </td>
                                            <td className="text-left">
                                                <span>
                                                    {favoriteSong.song.name}
                                                </span>
                                            </td>
                                            <td className="text-left">
                                                <span>
                                                    {favoriteSong.song.artist}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Link
                                                    as="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            favoriteSong.id
                                                        )
                                                    }
                                                    className="mt-2 text-white hover:text-black"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-6 h-6 stroke-white"
                                                    >
                                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr className="w-full text-3xl">
                                    <td
                                        colspan="5"
                                        className="text-center text-red-600"
                                    >
                                        Bạn chưa có bài hát yêu thích nào!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    contentLabel="Deleted Successfully"
                    className={
                        "fixed inset-0 flex items-center justify-center lg:px-36"
                    }
                    overlayClassName={"fixed inset-0 bg-opacity-0"}
                >
                    <div className="flex items-center gap-2 bg-cyan-200 p-8 font-semibold rounded w-26 h-10">
                        <h2>Đã xoá khỏi Bài hát yêu thích.</h2>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 stroke-green-700 stroke-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                            />
                        </svg>
                    </div>
                </Modal>
            </DefaultLayout>
        </>
    );
}
