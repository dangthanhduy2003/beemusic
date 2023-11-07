import DefaultLayout from "@/Layouts/DefaultLayout";
import { useMusic } from "./components/MusicContext";

export default function Home({ auth, musicCate }) {
    // Đối tượng audio
    const audioPlayer = document.getElementById("audioPlayer");
    const songTitle = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    const songThumbnail = document.getElementById("songThumbnail");
    // Xử lý sự kiện khi nhấn vào bài hát
    function playMusic(songUrl, name, artist, thumbnail) {
        audioPlayer.src = songUrl;
        audioPlayer.play();
        songTitle.textContent = name;
        songArtist.textContent = artist;
        songThumbnail.src = thumbnail;
    }
    return (
        <>
            <DefaultLayout auth={auth}>
                <div className="mt-2 lg:overflow-auto lg:h-2/3">
                    <section className="text-white">
                        <h1 className="lg:text-xl text-base font-bold">
                            {categories.name}
                        </h1>
                        <div className="flex flex-wrap md:grid grid-cols-3 text-xs gap-3 mt-3">
                            {musicCate.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => playMusic(item)}
                                    className="flex flex-row hover:bg-zinc-700 bg-neutral-800 w-full h-14 lg:w-96 lg:h-24 rounded"
                                >
                                    <img
                                        src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                        alt=""
                                        className="rounded-l-lg lg:w-24 object-cover"
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
                </div>
            </DefaultLayout>
        </>
    );
}
