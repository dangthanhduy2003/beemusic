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
        default:
            return state;
    }
}

export function MusicProvider({ children }) {
    const [state, dispatch] = useReducer(musicReducer, {
        currentSong: null,
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
    }, []);

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
