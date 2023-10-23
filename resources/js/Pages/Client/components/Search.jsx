import { Link } from "@inertiajs/react";

export default function Search() {
    return (
        <>
            <div className="flex flex-row justify-between text-white lg:h-1/3">
                <form class="relative block text-sm">
                    <span class="absolute inset-y-0 left-0 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-6 ml-3 lg:mb-2"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                    <input
                        class="placeholder:text-neutral-400 hover:bg-neutral-700 hover:border-2 
                    hover:border-neutral-600 bg-neutral-800 lg:w-96 w-64 h-9 lg:h-10 rounded-3xl 
                    pl-10 focus:outline-none focus:border-sky-500 focus:ring-1"
                        placeholder="Bạn muốn nghe gì?"
                        type="text"
                        name="search"
                    />
                </form>
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
            </div>
        </>
    );
}
