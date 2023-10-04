import Footer from "./components/Footer";
import Header from "./components/Header";

export default function DefaultLayout({ auth, children }) {
    return (
        <>
            {/* {auth ? <Header auth={auth.user} /> : <Header />}
            {children}
            <Footer /> */}
            <div className="container bg-gray-950">
                {/* Main */}
                <div className="flex flex-col">
                    {/* Top */}
                    <div className="flex flex-row h-screen">
                        {/* SiderBar */}
                        <div className="w-1/4 p-2">
                            <div className="bg-gray-800 rounded-xl flex flex-col justify-between h-full">
                                {/* Top */}
                                <div className="siderbar-top">
                                    {/* Logo */}
                                    <div className="logo ml-2">
                                        <span
                                            className="text-3xl"
                                            style={{ color: "#00C4FF" }}
                                        >
                                            Bee Music
                                        </span>
                                    </div>
                                    {/* Menu */}
                                    <div className="mt-2">
                                        <ul className="menu w-100 p-0 text-white">
                                            <li>
                                                <a className="hover:text-white text-lg">
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
                                                <a className="hover:text-white text-lg">
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
                                        </ul>
                                    </div>
                                </div>
                                {/* Bottom */}
                                <div className="siderbar-bottom border-t-2">
                                    <div className="text-white mt-2">
                                        <a
                                            href="#"
                                            className="flex justify-center text-lg"
                                        >
                                            <div className="mr-2">
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
                        <div className="w-3/4 p-2">Content</div>
                    </div>
                    {/* Control */}
                    <div className="control">
                        <div className="control-main flex flex-row justify-around">
                            {/* Music Info */}
                            <div className="flex flex-row gap-3">
                                <div className="h-10 w-10">
                                    <img
                                        src="https://cdn.tuoitre.vn/thumb_w/1060/471584752817336320/2023/5/7/son-tung-making-my-way-16834276740881763571256.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col text-white">
                                    <div>
                                        <span>Making My Way</span>
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
                                        className="w-6 h-6"
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
                            <div>
                                <div className="flex flex-col">
                                    {/* Button */}
                                    <div className="flex justify-center gap-2"></div>
                                </div>
                            </div>
                            {/* List - Volume */}
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
