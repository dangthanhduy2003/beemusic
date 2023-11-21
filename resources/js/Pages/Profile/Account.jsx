import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import DefaultLayout from "@/Layouts/DefaultLayout";

export default function Account({ auth }) {
    return (
        <>
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
                                        Cập nhật thông tin hồ sơ và địa chỉ
                                        email của tài khoản của bạn.
                                    </p>
                                </header>
                                <form className="mt-6 space-y-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Tên người dùng"
                                        />
                                        <TextInput
                                            id="name"
                                            className="mt-1 pl-1 block w-full"
                                            required
                                            isFocused
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
                                            autoComplete="username"
                                        />
                                        <InputError className="mt-2" />
                                    </div>

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
                                        />
                                        <InputError className="mt-2" />
                                    </div>
                                    <PrimaryButton>Lưu</PrimaryButton>
                                </form>
                            </section>
                        </div>
                        <div className="p-4 sm:p-8 bg-neutral-200 shadow sm:rounded-lg">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Cập nhật mật khẩu
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Đảm bảo tài khoản của bạn đang sử dụng
                                        mật khẩu dài, ngẫu nhiên để duy trì chắc
                                        chắn.
                                    </p>
                                </header>

                                <form className="mt-6 space-y-6">
                                    <div className="border border-black rounded-lg p-4">
                                        <InputLabel
                                            htmlFor="current_password"
                                            value="Mật khẩu hiện tại"
                                        />

                                        <TextInput
                                            id="current_password"
                                            type="password"
                                            className="mt-1 pl-1 block w-full"
                                            autoComplete="current-password"
                                        />

                                        <InputError className="mt-2" />
                                    </div>

                                    <div className="border border-black rounded-lg p-4">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Mật khẩu mới"
                                        />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            className="mt-1 pl-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError className="mt-2" />
                                    </div>

                                    <div className="border border-black rounded-lg p-4">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Nhập lại mật khẩu"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            className="mt-1 pl-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError className="mt-2" />
                                    </div>
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
                                        Sau khi tài khoản của bạn bị xóa, tất cả
                                        tài nguyên và dữ liệu của tài khoản đó
                                        sẽ bị xóa vĩnh viễn. Trước xóa tài khoản
                                        của bạn, vui lòng tải xuống mọi dữ liệu
                                        hoặc thông tin mà bạn muốn giữ lại.
                                    </p>
                                </header>

                                <DangerButton>Xóa tài khoản</DangerButton>

                                <Modal>
                                    <form className="p-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Bạn có chắc chắn muốn xóa tài khoản
                                            của mình không?
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600">
                                            Sau khi tài khoản của bạn bị xóa,
                                            tất cả tài nguyên và dữ liệu của tài
                                            khoản đó sẽ bị xóa vĩnh viễn. Vui
                                            lòng nhập mật khẩu của bạn để xác
                                            nhận rằng bạn muốn xóa vĩnh viễn tài
                                            khoản của mình.
                                        </p>

                                        <div className="mt-6">
                                            <InputLabel
                                                htmlFor="password"
                                                value="Mật khẩu"
                                                className="sr-only"
                                            />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                className="mt-1 block w-3/4"
                                                isFocused
                                                placeholder="Password"
                                            />

                                            <InputError className="mt-2" />
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton>
                                                Cancel
                                            </SecondaryButton>

                                            <DangerButton className="ml-3">
                                                Xóa tài khoản
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            </section>
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}
