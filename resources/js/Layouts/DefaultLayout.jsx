import Footer from "./components/Footer";
import Header from "./components/Header";
import "./DefaultLayout.css";

export default function DefaultLayout({ auth, children }) {
    return (
        <>
            {/* {auth ? <Header auth={auth.user} /> : <Header />}
            {children}
            <Footer /> */}
            <div className="container bg-black">
                {/* Main */}
                <div className="flex flex-col lg:h-screen">
                    {/* Top */}
                    <div className="flex flex-row lg:h-full">
                        {/* SiderBar */}
                        <div className="w-1/4 p-2 hidden lg:block">
                            <div
                                className="rounded-xl flex flex-col justify-between h-full"
                                style={{ backgroundColor: "#121212" }}
                            >
                                {/* Top */}
                                <div className="siderbar-top">
                                    {/* Logo */}
                                    <div className="logo ml-4 mt-3">
                                        <span
                                            className="lg:text-3xl font-bold"
                                            style={{ color: "#00C4FF" }}
                                        >
                                            BEE MUSIC
                                        </span>
                                    </div>
                                    {/* Menu */}
                                    <div className="mt-2">
                                        <ul className="menu w-100 p-0 text-white font-semibold">
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                                        />
                                                    </svg>
                                                    Trang chủ
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                                        />
                                                    </svg>
                                                    Thư viện
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                                                        />
                                                    </svg>
                                                    Bảng xếp hạng
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                                        />
                                                    </svg>
                                                    Thể loại
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                    Nghe gần dây
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a className="hover:bg-zinc-900 hover:text-white text-xl py-3">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-8 h-8"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                                        />
                                                    </svg>
                                                    Bài hát yêu thích
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Bottom */}
                                <div className="siderbar-bottom h-16 border-t-2">
                                    <div className="text-white mt-4">
                                        <a
                                            href="#"
                                            className="flex ml-4 text-xl"
                                        >
                                            <div className="mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-8 h-8"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 4.5v15m7.5-7.5h-15"
                                                    />
                                                </svg>
                                            </div>
                                            Tạo playlist mới
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Content */}
                        <div
                            className="lg:w-3/4 lg:pt-2 lg:pl-5 lg:rounded-xl lg:my-2"
                            style={{ backgroundColor: "#121212" }}
                        >
                            <div className="flex flex-row justify-between text-white">
                                <div
                                    className="flex flex-row items-center gap-2 lg:w-96 w-32 h-10 border-2-gray-50 rounded-2xl"
                                    style={{
                                        backgroundColor: "#4F4557",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-6 ml-3"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Tìm kiếm</span>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-10 h-10 mr-9"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div
                                className="overflow-auto mt-2"
                                style={{ height: "610px" }}
                            >
                                <section className="text-white">
                                    <h1 className="text-xl font-bold">
                                        Những bản nhạc đang thịnh hành
                                    </h1>
                                    <div className="flex flex-wrap gap-x-8 gap-y-4 mt-3">
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="mt-2 text-white">
                                    <h1 className="text-xl font-bold">
                                        Nghệ sĩ thịnh hành
                                    </h1>
                                    <div className="flex flex-row gap-4 mt-3">
                                        <div className="grid w-52 hover:bg-zinc-800 bg-zinc-900 rounded-lg h-52 justify-items-center">
                                            <img
                                                src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                                alt=""
                                                className="rounded-full w-40"
                                            />
                                            <span className="text-lg font-bold">
                                                JISOO
                                            </span>
                                        </div>
                                        <div className="grid w-52 hover:bg-zinc-800 bg-zinc-900 rounded-lg h-52 justify-items-center">
                                            <img
                                                src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                                alt=""
                                                className="rounded-full w-40"
                                            />
                                            <span className="text-lg font-bold">
                                                JISOO
                                            </span>
                                        </div>
                                        <div className="grid w-52 hover:bg-zinc-800 bg-zinc-900 rounded-lg h-52 justify-items-center">
                                            <img
                                                src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                                alt=""
                                                className="rounded-full w-40"
                                            />
                                            <span className="text-lg font-bold">
                                                JISOO
                                            </span>
                                        </div>
                                        <div className="grid w-52 hover:bg-zinc-800 bg-zinc-900 rounded-lg rounded-lg h-52 justify-items-center">
                                            <img
                                                src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                                alt=""
                                                className="rounded-full w-40"
                                            />
                                            <span className="text-lg font-bold">
                                                JISOO
                                            </span>
                                        </div>
                                        <div className="grid w-52 hover:bg-zinc-800 bg-zinc-900 rounded-lg h-52 justify-items-center">
                                            <img
                                                src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                                alt=""
                                                className="rounded-full w-40"
                                            />
                                            <span className="text-lg font-bold">
                                                JISOO
                                            </span>
                                        </div>
                                    </div>
                                </section>
                                <section className="mt-2 text-white">
                                    <h1 className="text-xl font-bold">
                                        Những bản nhạc Chill
                                    </h1>
                                    <div className="flex flex-wrap gap-x-8 gap-y-4 mt-3">
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="mt-2 text-white">
                                    <h1 className="text-xl font-bold">
                                        Những bản nhạc sôi động
                                    </h1>
                                    <div className="flex flex-wrap gap-x-8 gap-y-4 mt-3">
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="flex flex-row hover:bg-zinc-800 bg-zinc-900 h-28 rounded-lg"
                                            style={{
                                                width: "345px",
                                            }}
                                        >
                                            <img
                                                src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/25/1171721/1-167803852509020028.jpg"
                                                alt=""
                                                width={112}
                                                className="rounded-l-lg"
                                            />
                                            <div className="flex flex-col p-2 ml-2">
                                                <span className="text-lg font-bold">
                                                    Making my way
                                                </span>
                                                <span className="font-thin">
                                                    Sơn tùng M-TP
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    {/* Control */}
                    <div className="control mx-2 mb-2 p-2">
                        <div className="control-main flex flex-row">
                            {/* Music Info */}
                            <div className="flex flex-row w-2/6">
                                <div className="h-20 w-20">
                                    <img
                                        src="https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/5/7/son-tung-making-my-way-16834276740881763571256.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col text-white p-4">
                                    <div>
                                        <span className="font-semibold text-xl">
                                            Making My Way
                                        </span>
                                    </div>
                                    <div>
                                        <span>Sơn Tùng M-TP</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* Control */}
                            <div className="flex flex-col w-2/6 items-center">
                                {/* Button */}
                                <div className="flex flex-row gap-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        className="bi bi-shuffle h-5 w-5 mt-3"
                                        color="#7D7C7C"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                                        />
                                        <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="rotate-180 w-7 h-7 mt-2"
                                        color="#7D7C7C"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-10 h-10 text-white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-7 h-7 mt-1.5"
                                        color="#7D7C7C"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6 mt-2"
                                        color="#7D7C7C"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 013.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 10-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 00-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 00-4.392-4.392 49.422 49.422 0 00-7.436 0A4.756 4.756 0 003.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 101.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 013.01-3.01c1.19-.09 2.392-.135 3.605-.135zm-6.97 6.22a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 004.392 4.392 49.413 49.413 0 007.436 0 4.756 4.756 0 004.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 00-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 01-3.01 3.01 47.953 47.953 0 01-7.21 0 3.256 3.256 0 01-3.01-3.01 47.759 47.759 0 01-.1-1.759L6.97 15.53a.75.75 0 001.06-1.06l-3-3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="flex flex-row text-white gap-2">
                                    <span>0:00</span>
                                    <div
                                        className="w-96 h-1 border-2-gray-50 mt-3 rounded-lg"
                                        style={{
                                            backgroundColor: "#7D7C7C",
                                        }}
                                    ></div>
                                    <span>4:18</span>
                                </div>
                            </div>
                            {/* List - Volume */}
                            <div className="flex flex-row justify-end items-center w-2/6 gap-4 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M5.625 3.75a2.625 2.625 0 100 5.25h12.75a2.625 2.625 0 000-5.25H5.625zM3.75 11.25a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM3 15.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75zM3.75 18.75a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                                    <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                                </svg>
                                <div
                                    className="w-24 h-1 border-2 rounded-lg"
                                    style={{
                                        backgroundColor: "white",
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
