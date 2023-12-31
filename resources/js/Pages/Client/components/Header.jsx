import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useMusic } from "./MusicContext";
import Dropdown from "@/Components/Dropdown";

export default function Header({ auth }) {
    const { setIsMusicPlayerVisible } = useMusic();
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    // Ẩn thanh phát nhạc
    const hideMusicPlayer = () => {
        setIsMusicPlayerVisible(false);
    };

    const goBack = () => {
        window.history.back(); // Quay lại trang trước
    };

    const goForward = () => {
        window.history.forward(); // Điều hướng đến trang sau
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible(!isMobileMenuVisible);
        setIsButtonClicked(!isButtonClicked);
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center text-white lg:h-1/3">
                <div>
                    <button className="lg:hidden" onClick={toggleMobileMenu}>
                        {isButtonClicked ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                                />
                            </svg>
                        )}
                    </button>
                    <button onClick={goBack}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 hover:bg-neutral-800 fill-gray-500 hover:fill-white rounded"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <button onClick={goForward}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 hover:bg-neutral-800 fill-gray-500 hover:fill-white rounded"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div>
                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <img
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                    src={`../upload/images/${auth.user.avatar}`}
                                    alt=""
                                />
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-1 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-cyan-400 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {auth.user.name}
                                    </button>
                                    {auth.user.status === 2 &&
                                        auth.user.id_role !== 1 && (
                                            <img
                                                className="w-4 h-4 mt-2.5"
                                                src="../upload/images/twitter-verified-seeklogo.com.svg"
                                                alt=""
                                            />
                                        )}
                                    {auth.user.id_role === 1 && (
                                        <img
                                            className="w-4 h-4 mt-2.5"
                                            src="../upload/images/twitter-verified-badge-gold-seeklogo.com.svg"
                                            alt=""
                                        />
                                    )}
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {auth.user &&
                                    (auth.user.id_role === 3 ||
                                        auth.user.id_role === 1) && (
                                        <>
                                            <Dropdown.Link
                                                href={"/dashboard"}
                                                onClick={hideMusicPlayer}
                                            >
                                                <div className="flex flex-row justify-between">
                                                    Trang quản lý
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
                                                            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                                                        />
                                                    </svg>
                                                </div>
                                            </Dropdown.Link>
                                        </>
                                    )}
                                <Dropdown.Link href={"/editacc"}>
                                    <div className="flex flex-row justify-between">
                                        Hồ sơ
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
                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            />
                                        </svg>
                                    </div>
                                </Dropdown.Link>
                                {auth.user && auth.user.status !== 2 && (
                                    <>
                                        <Dropdown.Link href={"/premium"}>
                                            <div className="flex flex-row justify-between">
                                                Premium
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                                    />
                                                </svg>
                                            </div>
                                        </Dropdown.Link>
                                    </>
                                )}
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <div className="flex flex-row justify-between">
                                        Đăng xuất
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
                                                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                                            />
                                        </svg>
                                    </div>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <Link href="/dashboard" onClick={hideMusicPlayer}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-10 h-10 lg:mr-9"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
            {isMobileMenuVisible && (
                <div
                    className="lg:hidden bg-neutral-800 rounded mt-2"
                    onClick={toggleMobileMenu}
                >
                    <ul className="menu w-100 p-0 text-white text-sm font-semibold">
                        {auth.user !== null ? (
                            <>
                                <li>
                                    <Link
                                        href="/song-history"
                                        className="hover:bg-zinc-800 hover:text-white py-3"
                                    >
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
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Nghe gần đây
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/favorite-songs"
                                        className="hover:bg-zinc-800 hover:text-white py-3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 stroke-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                            />
                                        </svg>
                                        Bài hát yêu thích
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="/song-history"
                                        onClick={hideMusicPlayer}
                                        className="hover:bg-zinc-800 hover:text-white py-3"
                                    >
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
                                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Nghe gần đây
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/favorite-songs"
                                        onClick={hideMusicPlayer}
                                        className="hover:bg-zinc-800 hover:text-white py-3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 stroke-white"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                            />
                                        </svg>
                                        Bài hát yêu thích
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                href="/hotline"
                                className="hover:bg-zinc-800 hover:text-white py-3"
                            >
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
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                    />
                                </svg>
                                Thông tin liên hệ
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}
