import { Link } from "@inertiajs/react";
import { useMusic } from "./MusicContext";
import Dropdown from "@/Components/Dropdown";

export default function Header({ auth }) {
    const { setIsMusicPlayerVisible } = useMusic();

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

    return (
        <>
            <div className="flex flex-row justify-between items-center text-white lg:h-1/3">
                <div>
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
                {auth.user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <img
                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                src={`http://localhost:8000/upload/images/${auth.user.avatar}`}
                                alt=""
                            />
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-cyan-400 focus:outline-none transition ease-in-out duration-150"
                                >
                                    {auth.user.name}
                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
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
                                            Trang quản lý
                                        </Dropdown.Link>
                                    </>
                                )}
                            <Dropdown.Link href={"/editacc"}>
                                Hồ sơ
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Đăng xuất
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <Link href="/dashboard">
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
        </>
    );
}
