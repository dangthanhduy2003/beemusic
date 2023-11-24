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
                songsInSelectedCategory: action.songsInSelectedCategory.map(
                    (item) => ({
                        ...item,
                        isCurrent: item.id === action.song.id, // Xác định bài hát đang phát
                    })
                ),
            };
        case "NEXT":
            const currentIndex = state.songsInSelectedCategory.findIndex(
                (song) => song.id === state.currentSong.id
            );
            const nextIndex =
                (currentIndex + 1) % state.songsInSelectedCategory.length;

            // Tạo một bản sao của danh sách bài hát để tránh thay đổi trực tiếp trên state
            const updatedSongs = [...state.songsInSelectedCategory];

            // Di chuyển bài hát đang phát đến cuối danh sách
            const currentSong = updatedSongs.splice(currentIndex, 1)[0];
            updatedSongs.push(currentSong);

            // Đặt isCurrent là false cho tất cả các bài hát
            updatedSongs.forEach((song) => {
                song.isCurrent = false;
            });

            // Đặt isCurrent là true cho bài hát đang phát
            updatedSongs[0].isCurrent = true;

            return {
                ...state,
                currentSong: updatedSongs[0], // Lấy bài hát ở đầu danh sách là bài hát đang phát
                songsInSelectedCategory: updatedSongs,
            };

        case "BACK":
            const currentIndexBack = state.songsInSelectedCategory.findIndex(
                (song) => song.id === state.currentSong.id
            );
            const previousIndex =
                (currentIndexBack - 1 + state.songsInSelectedCategory.length) %
                state.songsInSelectedCategory.length;
            const previousSong = state.songsInSelectedCategory[previousIndex];

            // Cập nhật isCurrent cho tất cả các bài hát
            const updatedSongsBack = state.songsInSelectedCategory.map(
                (song) => ({
                    ...song,
                    isCurrent: false,
                })
            );

            // Đặt isCurrent là true cho bài hát đang phát
            updatedSongsBack[previousIndex].isCurrent = true;

            // Sắp xếp danh sách để bài hát đang phát hiển thị đầu tiên
            const sortedSongsBack = [
                updatedSongsBack[previousIndex],
                ...updatedSongsBack.slice(0, previousIndex),
                ...updatedSongsBack.slice(previousIndex + 1),
            ];

            return {
                ...state,
                currentSong: previousSong,
                songsInSelectedCategory: sortedSongsBack,
            };

        case "END":
            const currentIndexEnded = state.songsInSelectedCategory.findIndex(
                (song) => song.id === state.currentSong.id
            );
            const nextIndexEnded =
                (currentIndexEnded + 1) % state.songsInSelectedCategory.length;

            // Kiểm tra xem có ở bài hát cuối cùng không
            const isLastSongEnded = nextIndexEnded === 0;

            // Cập nhật isCurrent cho tất cả các bài hát
            const updatedSongsEnded = state.songsInSelectedCategory.map(
                (song) => ({
                    ...song,
                    isCurrent: false,
                })
            );

            // Đặt isCurrent là true cho bài hát đang phát
            updatedSongsEnded[
                isLastSongEnded ? 0 : nextIndexEnded
            ].isCurrent = true;

            // Sắp xếp danh sách để bài hát đang phát hiển thị cuối cùng
            const sortedSongsEnded = [
                updatedSongsEnded[isLastSongEnded ? 0 : nextIndexEnded],
                ...updatedSongsEnded.slice(
                    isLastSongEnded ? 1 : nextIndexEnded + 1
                ),
                ...updatedSongsEnded.slice(
                    0,
                    isLastSongEnded ? 1 : nextIndexEnded
                ),
            ];

            return {
                ...state,
                currentSong: isLastSongEnded
                    ? state.songsInSelectedCategory[0] // Nếu là bài hát cuối cùng, chuyển đến bài hát đầu tiên
                    : state.songsInSelectedCategory[nextIndexEnded],
                songsInSelectedCategory: sortedSongsEnded,
            };
        case "RESTORE_STATE":
            return {
                ...state,
                currentSong: action.musicPlayerState.currentSong,
                songsInSelectedCategory:
                    action.musicPlayerState.songsInSelectedCategory,
            };
        default:
            return state;
    }
}

export function MusicProvider({ children }) {
    const [state, dispatch] = useReducer(musicReducer, {
        currentSong: null,
        songsInSelectedCategory: [],
    });

    const shouldHideMusicPlayer =
        localStorage.getItem("hideMusicPlayer") === "true";

    const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(
        !shouldHideMusicPlayer
    );

    const pagesToHideMusicPlayer = [
        "/dashboard",
        "/profile",
        "/login",
        "/register",
    ];

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
    }, [state.currentSong]);
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
