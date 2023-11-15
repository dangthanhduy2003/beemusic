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

export default function Search({ cate, artist, music }) {
    const [isHovered, setIsHovered] = useState(false);
    const { dispatch } = useMusic();
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
        dispatch({ type: "PLAY", song });
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
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <form className="lg:fixed top-3 start-96 w-96">
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
                                    className="flex flex-row relative group hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-24 w-20 object-cover"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-lg">
                                            {item.name}
                                        </span>
                                        <span className="font-thin lg:text-base">
                                            {item.artist}
                                        </span>
                                    </div>
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
                                                className="w-16 h-16 stroke-none"
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
                                    className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:gap-y-2 lg:rounded-lg lg:w-44 lg:h-56"
                                >
                                    <Link
                                        href={`/songArtist/${item.id}`} // Sửa thành href
                                    >
                                        <img
                                            src={`http://localhost:8000/upload/images/${item.avatar}`}
                                            alt=""
                                            className="rounded-lg lg:rounded-full object-cover lg:h-40 w-20 lg:w-40 lg:mt-4 "
                                        />
                                        <span className="text-sm lg:text-lg font-medium">
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
                                        <div className="w-28 lg:w-36 h-36 ml-20 lg:mt-6">
                                            <img
                                                src={`http://localhost:8000/upload/images/${item.avatar}`}
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
