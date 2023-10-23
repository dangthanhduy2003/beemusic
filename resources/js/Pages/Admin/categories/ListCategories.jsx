import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddCate from "./AddCate";

export default function ListCategories({ auth, categories }) {
    const [addModalIsOpen, setaddModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Đặt số mục trên mỗi trang

    const openAddModal = () => {
        setaddModalIsOpen(true);
    };

    const closeAddModal = () => {
        setaddModalIsOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div>
                    <div>
                        <h2>Danh sách thể loại</h2>
                    </div>
                    <div>
                        <button
                            className="w-28 h-9 bg-cyan-400 rounded-md text-lg hover:bg-cyan-200"
                            onClick={openAddModal}
                        >
                            Thêm
                        </button>

                        <AddCate
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                        />
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên danh mục</th>
                                    <th>Ảnh danh mục</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems ? (
                                    currentItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <img
                                                    className="w-12"
                                                    src={`http://localhost:8000/upload/images/${item.avatar}`}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/categories/update/${item.id}`}
                                                    className="w-28 h-9 bg-cyan-400 rounded-md text-lg hover:bg-cyan-200"
                                                >
                                                    Sửa
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/categories/delete/${item.id}`}
                                                    onClick={() =>
                                                        window.confirm(
                                                            "Bạn có chắc chắn muốn xóa?"
                                                        )
                                                    }
                                                >
                                                    Xóa
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">
                                            No categories available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination flex flex-row gap-2">
                        {Array.from({
                            length: Math.ceil(categories.length / itemsPerPage),
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
