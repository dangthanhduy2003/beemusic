import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Home({
    auth,
    music,
    artist,
    musicByCategory,
    musicCategory,
}) {
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc đang thịnh hành
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {music.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg"
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
                            Nghệ sĩ thịnh hành
                        </h1>
                        <div className="grid grid-cols-3 w-full md:grid-cols-6 lg:grid-cols-6 gap-4 lg:gap-6 mt-3">
                            {artist.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid justify-items-center h-32 lg:hover:bg-zinc-700 lg:bg-neutral-800 lg:rounded-lg lg:w-44 lg:h-56"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.avatar}`}
                                        alt=""
                                        className="rounded-lg lg:rounded-full w-24 lg:w-36 lg:mt-4"
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
                            Những bản nhạc Chill
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicByCategory.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-lg">
                                            {item.name}
                                        </span>
                                        <span className="font-thin lg:text-base">
                                            Sơn tùng M-TP
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="mt-2 mb-2 text-white lg:mb-0">
                        <h1 className="lg:text-xl text-base font-bold">
                            Những bản nhạc sôi động
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicCategory.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg"
                                    />
                                    <div className="flex flex-col p-2 ml-2">
                                        <span className="font-semibold lg:text-lg">
                                            {item.name}
                                        </span>
                                        <span className="font-thin lg:text-base">
                                            Sơn tùng M-TP
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </DefaultLayout>
        </>
    );
}
