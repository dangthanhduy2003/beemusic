import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Home({ auth }) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc đang thịnh hành
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Nghệ sĩ thịnh hành
                        </h1>
                        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                            <div className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56">
                                <img
                                    src="https://avatar-ex-swe.nixcdn.com/song/2023/03/31/4/b/6/5/1680235062583_640.jpg"
                                    alt=""
                                    className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
                                />
                                <span className="text-sm lg:text-lg font-medium">
                                    JISOO
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className="mt-2 text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc Chill
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-2 mb-2 text-white lg:mb-0">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc sôi động
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded">
                                <img
                                    src="https://photo-resize-zmp3.zmdcdn.me/w256_r1x1_jpeg/cover/1/2/5/e/125e5f8feeb3ba813291070a2e46dce1.jpg"
                                    alt=""
                                    className="rounded-l-lg"
                                />
                                <div className="flex flex-col p-2 ml-2">
                                    <span className="font-semibold lg:text-lg">
                                        Making my way
                                    </span>
                                    <span className="font-thin lg:text-base">
                                        Sơn tùng M-TP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
