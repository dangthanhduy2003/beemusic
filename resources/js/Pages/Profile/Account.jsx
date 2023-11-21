import React from 'react';
import { useForm } from 'react-hook-form';
import { Inertia } from '@inertiajs/inertia';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import DefaultLayout from "@/Layouts/DefaultLayout";
import DangerButton from "@/Components/DangerButton";
import { useState } from 'react';

export default function Account({ auth }) {
    const { user } = auth;
    const { register, handleSubmit, setValue } = useForm();
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            await Inertia.post(`/editUser/${user.id}`, formData);
            setSuccessMessage('Cập nhật hành công!');
    // Tải lại trang sau khi cập nhật thành công
    setTimeout(() => {
        window.location.reload();
    }, 3000);

            // Ẩn thông báo sau 5 giây
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        }
    };


    return (
        <DefaultLayout auth={auth}>
            <div className="lg:overflow-auto lg:h-2/3 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Thông tin cá nhân
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Cập nhật thông tin hồ sơ và địa chỉ email của tài khoản của bạn.
                                </p>
                            </header>
                            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Tên người dùng"
                                    />
                                    <TextInput
                                        id="name"
                                        className="mt-1 pl-1 block w-full"
                                        required
                                        defaultValue={user.name}
                                        {...register('name')}
                                        autoComplete="name"
                                    />
                                    <InputError className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        value="Email"
                                    />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 pl-1 block w-full"
                                        required
                                        defaultValue={user.email}
                                        {...register('email')}
                                        autoComplete="email"
                                    />
                                    <InputError className="mt-2" />
                                </div>
                                <img
                                    src={`http://localhost:8000/upload/images/${user.avatar}`}
                                    alt=""
                                    className="w-24 h-24 rounded object-cover mr-4"
                                />
                                <div>
                                    <InputLabel
                                        htmlFor="avatar"
                                        value="Ảnh đại diện"
                                    />
                                    <input
                                        id="avatar"
                                        type="file"
                                        className="mt-1 block w-full"
                                        accept="image/*"
                                        {...register('avatar')}
                                    />
                                    <InputError className="mt-2" />
                                </div>
                                <PrimaryButton type="submit">Lưu</PrimaryButton>
                            </form>
                            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Cập nhật mật khẩu
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Đảm bảo tài khoản của bạn đang sử dụng mật khẩu dài, ngẫu nhiên để duy trì chắc chắn.
                                </p>
                            </header>
                            <form className="mt-6 space-y-6">
                                {/* Phần cập nhật mật khẩu từ mã nguồn gốc của bạn */}
                                {/* ... */}
                                <PrimaryButton>Lưu</PrimaryButton>
                            </form>
                        </section>
                    </div>

                    <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Xóa tài khoản
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sau khi tài khoản của bạn bị xóa, tất cả tài nguyên và dữ liệu của tài khoản đó sẽ bị xóa vĩnh viễn. Trước xóa tài khoản của bạn, vui lòng tải xuống mọi dữ liệu hoặc thông tin mà bạn muốn giữ lại.
                                </p>
                            </header>
                            <DangerButton>Xóa tài khoản</DangerButton>
                            {/* Phần xác nhận xóa tài khoản từ mã nguồn gốc của bạn */}
                            {/* ... */}
                        </section>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
