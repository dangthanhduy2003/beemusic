import React, {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
} from "react";

const MusicContext = createContext();

export function useMusic() {
    return useContext(MusicContext);
}

function musicReducer(state, action) {
    switch (action.type) {
        case "PLAY":
            return {
                ...state,
                currentSong: action.song,
            };
        case "SET_CURRENT_CATEGORY":
            return {
                ...state,
                currentCategory: action.category,
            };
        case "SET_PLAYLIST":
            return {
                ...state,
                playlist: action.playlist,
            };
        case "NEXT":
            const currentIndex = state.playlist.findIndex(
                (song) => song.id === state.currentSong.id
            );
            const nextIndex = (currentIndex + 1) % state.playlist.length;
            const nextSong = state.playlist[nextIndex];

            return {
                ...state,
                currentSong: nextSong,
            };
        default:
            return state;
    }
}

export function MusicProvider({ children }) {
    const [state, dispatch] = useReducer(musicReducer, {
        currentSong: null,
        currentCategory: null,
        playlist: [],
    });

    const shouldHideMusicPlayer =
        localStorage.getItem("hideMusicPlayer") === "true";

    const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(
        !shouldHideMusicPlayer
    );

    const pagesToHideMusicPlayer = ["/dashboard", "/login", "/register"];

    useEffect(() => {
        // Lấy đường dẫn URL của trang hiện tại
        const currentPath = window.location.pathname;

        // Kiểm tra xem trang hiện tại có nằm trong danh sách pagesToHideMusicPlayer không
        const shouldHide = pagesToHideMusicPlayer.includes(currentPath);
        const shouldHided =
            currentPath.startsWith("/user") ||
            currentPath.startsWith("/music") ||
            currentPath.startsWith("/categories") ||
            currentPath.startsWith("/album");

        // Cập nhật trạng thái và localStorage cho từng trường hợp
        if (shouldHide) {
            setIsMusicPlayerVisible(false);
            localStorage.setItem("hideMusicPlayer", "true");
        } else if (shouldHided) {
            setIsMusicPlayerVisible(false);
            localStorage.setItem("hideMusicPlayer", "true");
        } else {
            setIsMusicPlayerVisible(true);
            localStorage.setItem("hideMusicPlayer", "false");
        }
        //next nhạc
        const handleEnded = () => {
            dispatch({ type: "NEXT" });
        };

        const audio = document.getElementById("audio");

        // Ensure that the audio element exists before adding the event listener
        if (audio) {
            audio.addEventListener("ended", handleEnded);
        }

        return () => {
            // Clean up the event listener when the component unmounts
            if (audio) {
                audio.removeEventListener("ended", handleEnded);
            }
        };
    }, [state.currentSong, state.playlist]);

    useEffect(() => {
        // Thực hiện logic load danh sách phát khi currentCategory thay đổi
        const loadPlaylist = async () => {
            try {
                // Fetch danh sách phát dựa trên currentCategory
                const playlistData = await fetchPlaylistByCategory(
                    state.currentCategory
                );

                // Dispatch action để set danh sách phát
                dispatch({ type: "SET_PLAYLIST", playlist: playlistData });
            } catch (error) {
                console.error("Error loading playlist", error);
            }
        };

        // Gọi hàm loadPlaylist khi currentCategory thay đổi
        if (state.currentCategory !== null) {
            loadPlaylist();
        }
    }, [state.currentCategory]);

    return (
        <MusicContext.Provider
            value={{
                state,
                dispatch,
                isMusicPlayerVisible,
                setIsMusicPlayerVisible,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
}
