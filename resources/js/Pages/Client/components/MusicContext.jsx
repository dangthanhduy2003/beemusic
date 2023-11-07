import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useRef,
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

    return (
        <MusicContext.Provider value={{ state, dispatch }}>
            {children}
        </MusicContext.Provider>
    );
}
