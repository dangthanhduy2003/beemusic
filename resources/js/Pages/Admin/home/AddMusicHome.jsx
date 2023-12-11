import React, { useState } from "react";
import Modal from "react-modal";
import { router } from "@inertiajs/react";

export default function AddMusicHome({
    isOpen,
    onRequestClose,
    musicList,
    id_home
    
}) {
    const [formData, setFormData] = useState({
        id_music: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState(""); // Step 1

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Step 2: Modify currentItems based on search
    const filteredMusicList = musicList.filter((music) =>
        music.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredMusicList.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                id_music: [...formData.id_music, name],
            });
        } else {
            setFormData({
                ...formData,
                id_music: formData.id_music.filter((id) => id !== name),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(`/home/addMusicHome/${id_home}`, formData);
        onRequestClose();
    };

    // Step 3: Create a function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page when the search term changes
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Example Modal"
                className={"fixed inset-0 flex items-center justify-center"}
                overlayClassName={"fixed inset-0 bg-opacity-0"}
            >
                <div className="bg-cyan-100 p-10 rounded-lg">
                    <div className="flex flex-row justify-between">
                        <h2 className="font-bold text-xl text-center">
                            THÊM BÀI HÁT
                        </h2>
                        <button onClick={onRequestClose}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-9 h-9 text-red-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="mx-auto mt-8">
                        <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <label
                                htmlFor="id_categories"
                                className="block text-gray-700 text-base font-bold mb-2"
                            >
                                Chọn bài hát:
                            </label>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {/* Step 4: Modify map function */}
                                {currentItems.map((music) => (
                                    <div
                                        className="flex flex-row gap-2 w-96"
                                        key={music.id}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`music_${music.id}`}
                                            name={music.id}
                                            checked={formData.id_music.includes(
                                                music.id.toString()
                                            )}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={`music_${music.id}`}>
                                            {/* chỗ hiển thị ra ngoài */}
                                            <div className="flex flex-row gap-2">
                                                <img
                                                    className="w-24 h-20 oject-cover"
                                                    src={`../../upload/images/${music.thumbnail}`}
                                                    alt=""
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        {music.name}
                                                    </span>
                                                    <span>{music.artist}</span>
                                                </div>
                                            </div>
                                            {/* end */}
                                        </label>
                                        <br />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    name="sbm"
                                    type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5"
                                >
                                    Thêm
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                        {Array.from({
                            length: Math.ceil(
                                filteredMusicList.length / itemsPerPage
                            ),
                        }).map((_, index) => (
                            <button
                                className="bg-cyan-400 hover.bg-cyan-200 w-10 h-7 rounded-md"
                                key={index}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    {/* Step 3: Add a search input field */}
                    <div className="mt-4">
                        <label
                            htmlFor="search"
                            className="text-gray-700 font-bold"
                        >
                            Tìm kiếm:
                        </label>
                        <input
                            type="text"
                            id="search"
                            name="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded-md mt-1"
                            placeholder="Nhập từ khóa tìm kiếm"
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}
