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
import { Cookies } from 'react-cookie';

export default function Account({ auth }) {
    const [passwordError, setPasswordError] = useState('');
    const { user } = auth;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, setError } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        if (data.avatar && data.avatar[0]) {
            formData.append('avatar', data.avatar[0]);
        }

        try {
            await Inertia.post(`/editUser/${user.id}`, formData);
            setSuccessMessage('Cập nhật thành công!');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin người dùng:', error);
        }
    };

    const onSubmitPassword = async (data) => {
        const formData = new FormData();
        formData.append('password', data.password);
        await Inertia.post(`/updatePassword/${user.id}`,formData);
    };


//xóa tài khoản
const handleDeleteAccount = () => {
    setShowDeleteModal(true);
};

const handleConfirmDelete = async () => {
    try {
        const cookies = new Cookies();
        cookies.remove('your_auth_cookie_name');

        await Inertia.get(`/deleteUser/${user.id}`);

        window.location.href = '/';
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        // Xử lý lỗi
    }
};

const handleCancelDelete = () => {
    setShowDeleteModal(false);
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
                                <div className="success-message text-green">
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
                            
                            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmitPassword)}>
                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel htmlFor="current_password" value="Mật khẩu hiện tại" />
                                    <TextInput
                                        id="current_password"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="password"
                                        {...register('password')}
                                        name="password"  // Thêm name ở đây
                                    />
                                    <InputError className="mt-2" name="current_password" />
                                </div>

                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel htmlFor="password" value="Mật khẩu mới" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="new-password"
                                        {...register('newPassword')}
                                        name="newPassword"  // Thêm name ở đây
                                    />
                                    <InputError className="mt-2" name="newPassword" />
                                </div>

                                <div className="border border-black rounded-lg p-4">
                                    <InputLabel htmlFor="password_confirmation" value="Nhập lại mật khẩu" />
                                    <TextInput
                                        id="password_confirmation"
                                        type="password"
                                        className="mt-1 pl-1 block w-full"
                                        autoComplete="new-password"
                                        {...register('confirmPassword')}
                                        name="confirmPassword"  // Thêm name ở đây
                                    />
                                    <InputError className="mt-2" name="confirmPassword" />
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
                        <section>
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Xóa tài khoản
                                </h2>
                                <p className="mt-1 text-sm text-gray-600">
                                    Sau khi tài khoản của bạn bị xóa, tất cả tài nguyên và dữ liệu của tài khoản đó sẽ bị xóa vĩnh viễn. Trước xóa tài khoản của bạn, vui lòng tải xuống mọi dữ liệu hoặc thông tin mà bạn muốn giữ lại.
                                </p>
                            </header>
                            <DangerButton onClick={handleDeleteAccount}>
                                Xóa tài khoản
                            </DangerButton>
                        </section>
                    </div>

                    {showDeleteModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="bg-white p-4 sm:p-8 w-96 sm:w-1/2 rounded-lg">
                                <p className="text-lg font-medium text-gray-900">
                                    Xác nhận xóa tài khoản
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Bạn chắc chắn muốn xóa tài khoản của mình?
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <button className="mr-2 text-red-600" onClick={handleCancelDelete}>
                                        Hủy
                                    </button>
                                    <button className="text-blue-600" onClick={handleConfirmDelete}>
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
}