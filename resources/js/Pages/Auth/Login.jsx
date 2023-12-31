import React, { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useMusic } from "../Client/components/MusicContext";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: true,
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
        window.location.href = "/register";
    };

    const handleNavigateToPassword = (e) => {
        e.preventDefault();

        // Ẩn thanh phát nhạc trước khi chuyển trang
        hideMusicPlayer();
        window.location.href = "/forgot-password";
    };

    useEffect(() => {
        return () => {
            showMusicPlayer();
            reset("password");
        };
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await post(route("login"));

            if (response && response.status === 201) {
                // Nếu đăng ký thành công, hiển thị thanh phát nhạc
                showMusicPlayer();
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập:", error);
            // Xử lý lỗi nếu cần
        }
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="text-white">
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
                        className="mt-1 pl-2 block w-full h-10 bg-neutral-600"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 text-white">
                    <InputLabel
                        htmlFor="Mật mẩu"
                        className="text-white text-lg"
                        value="Mật khẩu"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 pl-2 block w-full h-10 bg-neutral-600"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-white">
                            Nhớ tài khoản
                        </span>
                    </label>
                </div>
                <div className="flex items-center justify mt-4 ml-8">
                    <Link
                        onClick={handleNavigateToRegister}
                        className="text-sm text-white"
                    >
                        Nếu bạn chưa có tài khoản, hãy nhấp vào đây?
                    </Link>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            onClick={handleNavigateToPassword}
                            className=" text-sm text-white"
                        >
                            Quên mật khẩu?
                        </Link>
                    )}

                    <PrimaryButton
                        className="ml-4 bg-sky-600 hover:bg-sky-800"
                        disabled={processing}
                        onClick={hideMusicPlayer}
                    >
                        Đăng nhập
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
