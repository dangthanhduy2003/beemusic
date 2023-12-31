import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { useMusic } from "../Client/components/MusicContext";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const { setIsMusicPlayerVisible } = useMusic();

    const hideMusicPlayer = () => {
        setIsMusicPlayerVisible(false);
    };

    const showMusicPlayer = () => {
        setIsMusicPlayerVisible(true);
    };

    const handleNavigateToRegister = (e) => {
        e.preventDefault();

        // Ẩn thanh phát nhạc trước khi chuyển trang
        hideMusicPlayer();

        // Sử dụng Inertia.js để chuyển hướng đến trang mới
        window.location.href = "/login";
    };

    useEffect(() => {
        return () => {
            // Khi component unmount, đảm bảo thanh phát nhạc được hiển thị
            showMusicPlayer();
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await post(route("register"));

            if (response && response.status === 201) {
                // Nếu đăng ký thành công, hiển thị thanh phát nhạc
                showMusicPlayer();
            }
        } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            // Xử lý lỗi nếu cần
        }
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div className="text-white">
                    <InputLabel
                        htmlFor="name"
                        className="text-white text-lg"
                        value="Tên người dùng"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 pl-2 text-white block w-full h-10 bg-neutral-600"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="email"
                        className="text-white text-lg"
                        value="Email"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 pl-2 text-white block w-full h-10 bg-neutral-600"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password"
                        className="text-white text-lg"
                        value="Mật khẩu"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 pl-2 text-white block w-full h-10 bg-neutral-600"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        className="text-white text-lg"
                        value="Nhập lại mật khẩu"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 pl-2 text-white block w-full h-10 bg-neutral-600"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        onClick={handleNavigateToRegister}
                        className="text-sm text-white"
                    >
                        Đã đăng ký?
                    </Link>

                    <PrimaryButton
                        className="ml-4 bg-sky-600 hover:bg-sky-800"
                        disabled={processing}
                        onClick={hideMusicPlayer}
                    >
                        Đăng ký
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
