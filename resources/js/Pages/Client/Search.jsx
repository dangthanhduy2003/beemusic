import React, { useState, useEffect } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import styled from "styled-components";
import { useMusic } from "./components/MusicContext";

const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const StyledBox = styled.div`
    background-color: ${(props) => props.bgColor || getRandomColor()};
`;

export default function Search({ auth, cate, artist, music, lyrics }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();
    const isLoggedIn = auth.user !== null;

    //code thêm
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMusic, setFilteredMusic] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        // Đảm bảo cập nhật danh sách người dùng đã lọc khi có thay đổi trong user
        setFilteredMusic(music);
        setFilteredUsers(artist);
    }, [music, artist]);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        //artist
        const filtered = artist.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
        );

        // Cập nhật state với danh sách người dùng đã lọc

        // Lọc danh sách âm nhạc dựa trên từ khóa tìm kiếm
        const filteredMusic = music.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.artist.toLowerCase().includes(searchTerm)
        );

        setFilteredMusic(filteredMusic);
        setSearchTerm(searchTerm);
        //artist
        setFilteredUsers(filtered);
    };
    //categories
    const filteredCategories = cate.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    //end
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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <form className="lg:fixed top-3 start-96 lg:w-96">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-white
                                rounded-full bg-neutral-800 focus:ring-blue-500 focus:border-blue-500
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Bạn muốn nghe gì?"
                                onChange={handleSearch}
                                value={searchTerm}
                            />
                        </div>
                    </form>
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Bài hát
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {filteredMusic.slice(0, 9).map((item) => (
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
                                            )}
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
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Nghệ sĩ
                        </h1>
                        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            {filteredUsers.slice(0, 6).map((item) => (
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
                            Thể loại
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-5 text-xs md:gap-y-8 gap-3 w-full mt-4">
                            {filteredCategories.map((item) => (
                                <StyledBox
                                    key={item.id}
                                    className="flex flex-col hover:bg-teal-500 w-44 h-24 lg:w-52 lg:h-44 rounded overflow-hidden"
                                >
                                    <Link
                                        href={`/songCate/${item.id}`} // Sửa thành href
                                    >
                                        <span className="font-bold lg:text-lg p-2">
                                            {item.name}
                                        </span>
                                        <div className="w-28 lg:w-36 h-40 ml-20 lg:mt-6">
                                            <img
                                                src={`../upload/images/${item.avatar}`}
                                                className="w-full h-full transform -rotate-45 object-cover"
                                            />
                                        </div>
                                    </Link>
                                </StyledBox>
                            ))}
                        </div>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
