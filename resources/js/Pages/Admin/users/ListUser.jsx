import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddUser from "./AddUser";

export default function ListUser({ auth, user, role }) {
    const [addModalIsOpen, setaddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3); // Đặt số mục trên mỗi trang

    const openAddModal = () => {
        setaddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setaddModalIsOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = user.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="p-2">
                    <div>
                        <h2>Danh sách người dùng</h2>
                    </div>
                    <div>
                        <button
                            className="w-28 h-9 bg-cyan-400 rounded-md text-lg hover:bg-cyan-200"
                            onClick={openAddModal}
                        >
                            Thêm
                        </button>

                        <AddUser
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                            role={role}
                        />
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên người dùng</th>
                                    <th>Email</th>
                                    <th>Ảnh đại diện</th>
                                    <th>Quyền truy cập</th>
                                    <th>Ngày đăng ký</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <img
                                                className="w-28"
                                                src={`http://localhost:8000/upload/images/${item.avatar}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            {role.map((role) =>
                                                role.id === item.id_role
                                                    ? role.short_role
                                                    : null
                                            )}
                                        </td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            <div>
                                                <Link
                                                    href={`/user/update/${item.id}`}
                                                    className="w-28 h-9 bg-cyan-400 rounded-md text-lg hover:bg-cyan-200"
                                                >
                                                    Sửa
                                                </Link>
                                            </div>
                                        </td>
                                        <td>
                                            <button>
                                                <Link
                                                    href={`/user/delete/${item.id}`}
                                                    onClick={() =>
                                                        window.confirm(
                                                            "Bạn có chắc chắn muốn xóa?"
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex flex-row gap-2">
                        {Array.from({
                            length: Math.ceil(user.length / itemsPerPage),
                        }).map((_, index) => (
                            <button
                                className="bg-cyan-400 w-12"
                                key={index}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
