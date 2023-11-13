import DefaultLayout from "@/Layouts/DefaultLayout";
import { Link } from "@inertiajs/react";
import styled from "styled-components";

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
    return (
        <>
            <DefaultLayout>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <form>
                        <label
                            htmlFor="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
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
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Mockups, Logos..."
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc đang thịnh hành
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {music.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
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
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Nghệ sĩ
                        </h1>
                        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            {artist.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:gap-y-2 lg:rounded-lg lg:w-44 lg:h-56"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.avatar}`}
                                        alt=""
                                        className="rounded-lg lg:rounded-full object-cover lg:h-40 w-20 lg:w-40 lg:mt-4 "
                                    />
                                    <span className="text-sm lg:text-lg font-medium">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Thể loại
                        </h1>

                        <div className="grid grid-cols-2 md:grid-cols-5 text-xs md:gap-y-8 gap-3 w-full mt-4">
                            {cate.map((item) => (
                                <StyledBox
                                    key={item.id}
                                    className="flex flex-col hover:bg-teal-500 w-44 h-24 lg:w-52 lg:h-44 rounded overflow-hidden"
                                >
                                    <Link
                                        href={`/musicCate/${item.id}`} // Sửa thành href
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
