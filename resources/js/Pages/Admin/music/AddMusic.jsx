import React, { useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";

export default function AddMusic({ auth, categories }) {
    // ẩn giá nếu không check bản quyền
    const [showPriceInput, setShowPriceInput] = useState(true);
    const [errors, setErrors] = useState({});
    // Thêm "start_time" và "end_time" vào state của lời bài hát
    const [formData, setFormData] = useState({
        name: "",
        thumbnail: null,
        lyrics: [{ content: "", start_time: "", end_time: "" }],
        link_file: null,
        artist: "",
        time: "",
        license: 0,
        id_categories: [],
    });
    // Thêm hàm xử lý thêm lời bài hát
    const addLyrics = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            lyrics: [
                ...prevFormData.lyrics,
                { start_time: "", end_time: "", content: "" },
            ],
        }));
    };
    //remove
    const removeLyrics = (index) => {
        const updatedLyrics = [...formData.lyrics];
        updatedLyrics.splice(index, 1);
        setFormData((prevFormData) => ({
            ...prevFormData,
            lyrics: updatedLyrics,
        }));
    };

    // Hàm xử lý sự thay đổi trong textarea lời bài hát
    const handleLyricsChange = (index, field, value) => {
        const newLyrics = [...formData.lyrics];
        newLyrics[index][field] = value;
        setFormData({ ...formData, lyrics: newLyrics });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, link_file: file });
    };

    const handleFileThumbnail = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, thumbnail: file });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        if (name === "license") {
            setFormData({
                ...formData,
                license: checked ? 1 : 0,
            });
            setShowPriceInput(checked);
        } else {
            if (checked) {
                setFormData({
                    ...formData,
                    id_categories: [...formData.id_categories, name],
                });
            } else {
                setFormData({
                    ...formData,
                    id_categories: formData.id_categories.filter(
                        (id) => id !== name
                    ),
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("artist", formData.artist);
            data.append("time", formData.time);
            data.append("thumbnail", formData.thumbnail);
            data.append("license", formData.license);
            formData.lyrics.forEach((lyric, index) => {
                data.append(`lyrics[${index}][start_time]`, lyric.start_time);
                data.append(`lyrics[${index}][end_time]`, lyric.end_time);
                data.append(`lyrics[${index}][content]`, lyric.content);
            });
            data.append("link_file", formData.link_file);
            formData.id_categories.forEach((categoryId) => {
                data.append("id_categories[]", categoryId);
            });

            const response = await axios.post("/music/add", data);
            if (response.status === 200) {
                window.location.replace("/music/list");
            }
        } catch (errors) {
            if (errors.response && errors.response.status === 422) {
                setErrors(errors.response.data.errors);
            }
        }
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="p-2 w-full">
                    <div>
                        <h2 className="lg:fixed top-5 ml-2 start-1/5 font-medium text-cyan-500 text-center text-2xl">
                            Thêm bài hát
                        </h2>
                    </div>
                    <div className="bg-neutral-400 rounded p-4">
                        <form
                            className="bg-white shadow-md rounded p-8"
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-row gap-10 w-full">
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên bài hát
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên bài hát"
                                        className="shadow appearance-none border w-full rounded py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.name && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.name[0]}
                                        />
                                    )}
                                </div>
                                <div className="mb-4 w-1/2">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Tên nghệ sỹ
                                    </label>
                                    <input
                                        type="text"
                                        name="artist"
                                        autoComplete="off"
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên nghệ sĩ"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.artist && (
                                        <InputError
                                            className="mt-2"
                                            message={errors.artist[0]}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-row gap-10 w-full">
                                <div className="flex flex-row justify-center items-center gap-2 mb-4 w-1/2">
                                    <label
                                        htmlFor="thumbnail"
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                    >
                                        Ảnh
                                    </label>
                                    {formData.thumbnail && (
                                        <img
                                            src={URL.createObjectURL(
                                                formData.thumbnail
                                            )}
                                            alt=""
                                            className="w-24 h-24 rounded object-cover mr-5"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        className="w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-cyan-200 file:text-violet-700
                                        hover:file:bg-cyan-400"
                                        onChange={handleFileThumbnail}
                                    />
                                    {errors.thumbnail && (
                                        <InputError
                                            message={errors.thumbnail[0]}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-row justify-center items-center gap-2 mb-4 w-1/2">
                                    <label
                                        htmlFor="link_file"
                                        className="block text-gray-700 text-sm font-bold mb-2 w-32"
                                    >
                                        Tải bài hát lên
                                    </label>
                                    <input
                                        type="file"
                                        name="link_file"
                                        className="w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-cyan-200 file:text-violet-700
                                        hover:file:bg-cyan-400"
                                        onChange={handleFileChange}
                                    />
                                    {errors.link_file && (
                                        <InputError
                                            message={errors.link_file[0]}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mb-4 w-80">
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Thời gian bài hát
                                </label>
                                <input
                                    type="text"
                                    name="time"
                                    autoComplete="off"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    placeholder="Hãy nhập tổng thời gian của bài hát-vd: 04:34"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                               {errors.time && (
                                        <InputError
                                            message={errors.time[0]}
                                        />
                                    )}
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 text-sm font-bold mb-1"
                                >
                                    Lời bài hát
                                </label>
                                <div className="flex flex-row w-full gap-10">
                                    <p className="text-gray-500 text-sm mb-2 w-1/2">
                                        Nhập lời bài hát theo từng đoạn và chỉ
                                        định thời gian bắt đầu và kết thúc cho
                                        đoạn.
                                    </p>
                                    <p className="text-gray-500 text-sm mb-2 w-1/2">
                                        Nhập thời gian bắt đầu và kết thúc theo
                                        định dạng 00:00.00
                                    </p>
                                </div>
                                {formData.lyrics.map((lyric, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex flex-row w-full gap-10">
                                            <textarea
                                                name={`lyrics[${index}].content`}
                                                value={lyric.content}
                                                onChange={(e) =>
                                                    handleLyricsChange(
                                                        index,
                                                        "content",
                                                        e.target.value
                                                    )
                                                }
                                                className="shadow appearance-none border rounded text-sm w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            ></textarea>
                                            <div className="flex flex-row justify-between w-1/2">
                                                <div className="flex flex-col gap-3 w-2/3">
                                                    <input
                                                        name={`lyrics[${index}].start_time`}
                                                        value={lyric.start_time}
                                                        onChange={(e) =>
                                                            handleLyricsChange(
                                                                index,
                                                                "start_time",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Thời gian bắt đầu"
                                                        className="shadow appearance-none border rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                    <input
                                                        name={`lyrics[${index}].end_time`}
                                                        value={lyric.end_time}
                                                        onChange={(e) =>
                                                            handleLyricsChange(
                                                                index,
                                                                "end_time",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Thời gian kết thúc"
                                                        className="shadow appearance-none border rounded text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeLyrics(index)
                                                        }
                                                        className="w-36 py-2 px-3 bg-red-700 text-sm hover:bg-red-900 text-white font-semibold rounded"
                                                    >
                                                        Xóa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={addLyrics}
                                                        className="w-36 py-2 px-3 bg-blue-700 text-sm hover:bg-blue-900 text-white font-semibold rounded"
                                                    >
                                                        Thêm hàng mới
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.lyrics && (
                                            <InputError
                                                className="mt-2"
                                                message={errors.lyrics[index]}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label
                                    htmlFor="id_categories"
                                    className="block text-gray-700 text-sm font-bold mb-4"
                                >
                                    Chọn danh mục:
                                </label>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex flex-row gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`category_${category.id}`}
                                            name={category.id}
                                            checked={formData.id_categories.includes(
                                                category.id.toString()
                                            )}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label
                                            htmlFor={`category_${category.id}`}
                                        >
                                            {category.name}
                                        </label>
                                        <br />
                                        {errors.id_categories && (
                                <InputError
                                    className="mt-2"
                                    message={errors.id_categories[0]}
                                />
                            )}
                                    </div>
                                    
                                ))}
                            </div>
                            {auth.user && auth.user.status === 2 && (
                                <div className="flex flex-row gap-10 w-full">
                                    <div className="mb-4 w-1/2">
                                        <label
                                            htmlFor="license"
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                        >
                                            Bản quyền
                                        </label>
                                        <input
                                            type="checkbox"
                                            name="license"
                                            checked={formData.license === 1}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">
                                            Nhạc bản quyền sẽ không được hiển
                                            thị ra trang chủ và không được chia
                                            sẽ doanh thu
                                        </span>
                                        {errors.license && (
                                            <InputError
                                                className="mt-2"
                                                message={errors.license[0]}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            <div className="flex justify-center">
                                <button
                                    name="sbm"
                                    type="submit"
                                    className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-base text-white font-semibold rounded mt-5"
                                >
                                    Thêm bài hát
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
