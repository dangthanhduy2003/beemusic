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
                    <div className="flex flex-row items-center w-full h-32 rounded text-white gap-5 bg-gradient-to-l from-slate-500 from-10%">
                        <div className="flex justify-center items-center w-28 h-28 rounded ml-10 bg-rose-500 bg-gradient-to-l from-white from-10%">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-12 h-12 fill-white"
                            >
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-gray-400 text-sm">
                                Playlist
                            </span>
                            <h1 className="text-4xl font-bold">
                                Bài hát đã thích
                            </h1>
                        </div>
                    </div>
                    <table class="table-auto w-full">
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

                        <tbody className="text-neutral-300 lg:text-base text-sm">
                            {Array.isArray(favoriteSongsState) &&
                            favoriteSongsState.length > 0 ? (
                                favoriteSongsState.map(
                                    (favoriteSong, index) => (
                                        <tr
                                            key={favoriteSong.id}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            className="hover:bg-gradient-to-t relative group from-teal-950 px-2"
                                        >
                                            <td className="relative group text-center">
                                                <span className="group-hover:hidden text-sm">
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
                                                    src={`../upload/images/${favoriteSong.song.thumbnail}`}
                                                    alt=""
                                                    className="rounded-lg lg:w-14 lg:h-14 w-14 h-14 object-cover my-2"
                                                />
                                                <span className="text-white font-semibold">
                                                    {favoriteSong.song.name}
                                                </span>
                                            </td>
                                            <td className="text-sm">
                                                <span>
                                                    {favoriteSong.song.artist}
                                                </span>
                                            </td>
                                            <td className="text-sm text-center">
                                                <span>
                                                    {favoriteSong.song.view}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex flex-row justify-start items-center gap-5">
                                                    <Link
                                                        as="button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                favoriteSong.id
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5 fill-white hover:fill-black hover:stroke-white"
                                                        >
                                                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                        </svg>
                                                    </Link>
                                                    <a
                                                        href={`../upload/audio/${favoriteSong.song.link_file}`}
                                                        download={`${favoriteSong.song.link_file}`}
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
                                                </div>
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
