import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MusicProvider } from "./Pages/Client/components/MusicContext";
import MusicPlayer from "./Pages/Client/components/MusicPlayer";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <MusicProvider>
                <div className="container lg:bg-black bg-neutral-900 font-sans">
                    <div className="flex flex-col h-screen">
                        <App {...props} />
                        <MusicPlayer />
                    </div>
                </div>
            </MusicProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
