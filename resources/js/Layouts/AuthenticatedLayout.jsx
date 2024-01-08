import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Header from "@/Pages/Admin/Header";
import "./DefaultLayout.css";
import { useMusic } from "@/Pages/Client/components/MusicContext";

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const { setIsMusicPlayerVisible } = useMusic();

    const hideMusicPlayer = () => {
        setTimeout(() => {
            setIsMusicPlayerVisible(true);
        }, 1000);
    };
    return (
        <div className="flex flex-row bg-black font-sans h-screen p-2">
            <div className="w-1/5 bg-neutral-900 rounded-xl">
                <Header user={user} />
            </div>
            <div className="w-4/5 bg-neutral-900 ml-2 rounded-xl">
                <nav className="h-1/3 bg-neutral-800 rounded-t-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-end h-16">
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative mb-2">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <img
                                                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                                src={`../../upload/images/${user.avatar}`}
                                                alt=""
                                            />
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-cyan-400 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}
                                                    {user.status === 2 &&
                                                        user.id_role !== 1 && (
                                                            <img
                                                                className="w-4 h-4 m-1"
                                                                src="../../upload/images/twitter-verified-seeklogo.com.svg"
                                                                alt=""
                                                            />
                                                        )}
                                                    {user.id_role === 1 && (
                                                        <img
                                                            className="w-4 h-4 m-1"
                                                            src="../../upload/images/twitter-verified-badge-gold-seeklogo.com.svg"
                                                            alt=""
                                                        />
                                                    )}
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
                                            <Dropdown.Link
                                                onClick={hideMusicPlayer}
                                                href={"/"}
                                            >
                                                <div className="flex flex-row justify-between">
                                                    Về trang chủ
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
                                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                                        />
                                                    </svg>
                                                </div>
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                onClick={hideMusicPlayer}
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
                                </div>
                            </div>

                            <div className="-mr-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {user.name}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    onClick={hideMusicPlayer}
                                    as="button"
                                >
                                    Log Outttttttt
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="lg:overflow-auto lg:h-2/3 rounded-xl">
                    {children}
                </main>
            </div>
        </div>
    );
}
