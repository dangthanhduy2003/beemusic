import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import AddMusic from "./AddMusic";

export default function ListMusic({ auth, music, categories }) {
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
    const currentItems = music.slice(indexOfFirstItem, indexOfLastItem);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div>
                    <div>
                        <h2>Danh sách bài hát</h2>
                    </div>
                    <div>
                        <button
                            className="w-28 h-9 bg-cyan-400 rounded-md text-lg hover:bg-cyan-200"
                            onClick={openAddModal}
                        >
                            Thêm
                        </button>

                        <AddMusic
                            isOpen={addModalIsOpen}
                            onRequestClose={closeAddModal}
                            categories={categories}
                        />
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên bài hát</th>
                                    <th>Âm thanh</th>
                                    <th>Ảnh</th>
                                    <th>Lượt nghe</th>
                                    <th>Lời bài hát</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.link_file ? (
                                                <div>
                                                    <audio controls>
                                                        <source
                                                            src={`http://localhost:8000/upload/audio/${item.link_file}`}
                                                            type="audio/mpeg"
                                                        />
                                                        Trình duyệt của bạn
                                                        không hỗ trợ phát audio.
                                                    </audio>
                                                </div>
                                            ) : (
                                                <p>
                                                    Không tìm thấy file âm
                                                    thanh.
                                                </p>
                                            )}
                                        </td>
                                        <td>
                                            <img
                                                className="w-28"
                                                src={`http://localhost:8000/upload/images/${item.thumbnail}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>{item.view}</td>
                                        <td>{item.lyrics}</td>
                                        <td>
                                            <button>
                                                <Link
                                                    href={`/music/update/${item.id}`}
                                                >
                                                    Sửa
                                                </Link>
                                            </button>
                                        </td>
                                        <td>
                                            <button>
                                                <Link
                                                    href={`/music/delete/${item.id}`}
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
                            length: Math.ceil(music.length / itemsPerPage),
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
