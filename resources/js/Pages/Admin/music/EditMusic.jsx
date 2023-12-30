import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function EditMusic({
  auth,
  music,
  musicCate,
  categories,
  selectedCategories,
  lyrics,
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    thumbnail: null,
    lyrics: [{ content: "", start_time: "", end_time: "" }],
    link_file: null,
    artist: "",
    id_categories: [],
  });
  const [imagePreview, setImagePreview] = useState(
    music.thumbnail ? `../../upload/images/${music.thumbnail}` : null
  );

  useEffect(() => {
    setFormData({
      name: music.name,
      artist: music.artist,
      link_file: null,
      thumbnail: null,
      lyrics: lyrics.map((lyric) => ({ ...lyric, isNew: false })),
      id_categories: selectedCategories,
    });

    setImagePreview(
      music.thumbnail ? `../../upload/images/${music.thumbnail}` : null
    );
  }, [music, selectedCategories, lyrics]);

  const handleInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedLyrics = [...formData.lyrics];

    if (name === "content" || name === "start_time" || name === "end_time") {
      updatedLyrics[index][name] = value;
    } else if (name === "thumbnail" || name === "link_file") {
      updatedLyrics[index][name] = files && files[0] ? files[0] : value;
    }

    setFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.lyrics = updatedLyrics;
      return updatedData;
    });
  };

  const addNewLyricInput = () => {
    setFormData((prevData) => ({
      ...prevData,
      lyrics: [
        ...prevData.lyrics,
        { content: "", start_time: "", end_time: "", isNew: true },
      ],
    }));
  };

  const removeLyricInput = (index) => {
    const updatedLyrics = [...formData.lyrics];
    updatedLyrics.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      lyrics: updatedLyrics,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "lyrics") {
          formData.lyrics.forEach((lyric, index) => {
            Object.keys(lyric).forEach((lyricKey) => {
              data.append(`lyrics[${index}][${lyricKey}]`, lyric[lyricKey]);
            });
            if (lyric.isNew) {
              data.append(`lyrics[${index}][isNew]`, true);
            }
          });
        } else {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(`/music/update/${music.id}`, data);

      if (response.status === 200) {
        window.location.href = "/music/list";
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <AuthenticatedLayout user={auth.user}>
        <div className="p-2 w-full">
          <div>
            <h2 className="font-semibold text-white text-center text-2xl">
              Chỉnh sửa bài hát
            </h2>
          </div>
          <div className="bg-neutral-400 rounded mt-4 p-4">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="bg-neutral-200 rounded p-4"
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
                    value={formData.name}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                <div className="flex flex-col mb-4 w-1/2">
                  <label
                    htmlFor="thumbnail"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Ảnh
                  </label>
                  <div className="flex flex-row justify-center gap-2 items-center">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-24 h-24 rounded object-cover mr-4"
                    />
                    <input
                      type="file"
                      name="thumbnail"
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-200 file:text-violet-700 hover:file:bg-cyan-400"
                      onChange={(e) => handleInputChange(e, 0)}
                    />
                    {errors.thumbnail && (
                      <InputError
                        className="mt-2"
                        message={errors.thumbnail[0]}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col mb-4 w-1/2">
                  <label
                    htmlFor="link_file"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Âm thanh bài hát
                  </label>
                  <div className="mb-4">
                    <audio controls className="w-full">
                      <source
                        src={`../../upload/audio/${music.link_file}`}
                        type="audio/mpeg"
                      />
                      Trình duyệt của bạn không hỗ trợ phát audio.
                    </audio>
                  </div>
                  <input
                    type="file"
                    name="link_file"
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-200 file:text-violet-700 hover:file:bg-cyan-400"
                    onChange={(e) => handleInputChange(e, 0)}
                  />
                  {errors.link_file && (
                    <InputError
                      className="mt-2"
                      message={errors.link_file[0]}
                    />
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lyrics"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Lời bài hát
                </label>
                {formData.lyrics.map((lyric, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      name={`lyrics[${index}][start_time]`}
                      value={lyric.start_time}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Thời gian bắt đầu 00:00:00"
                      className="w-1/4 border rounded py-2 px-3"
                    />
                    <input
                      type="text"
                      name={`lyrics[${index}][end_time]`}
                      value={lyric.end_time}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Thời gian kết thúc 00:00:00"
                      className="w-1/4 border rounded py-2 px-3"
                    />
                    <input
                      type="text"
                      name={`lyrics[${index}][content]`}
                      value={lyric.content}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Nội dung đoạn nhạc"
                      className="w-1/2 border rounded py-2 px-3"
                    />
                    <button
                      type="button"
                      onClick={() => removeLyricInput(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addNewLyricInput}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Thêm lời mới
                </button>
              </div>
              <div>
                <label
                  htmlFor="id_categories"
                  className="block text-gray-700 text-sm font-bold mb-2"
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
                      name="id_categories"
                      value={category.id}
                      checked={formData.id_categories.includes(
                        category.id
                      )}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor={`category_${category.id}`}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
                {errors.id_categories && (
                  <InputError
                    className="mt-2"
                    message={errors.id_categories[0]}
                  />
                )}
              </div>
              <div className="flex justify-between items-center">
                <Link href={route("music.list")}>
                  <div className="text-red-700 mt-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </Link>
                <button
                  type="submit"
                  className="w-40 h-10 bg-blue-700 hover:bg-blue-900 text-white font-bold rounded mt-5"
                >
                  Sửa
                </button>
              </div>
            </form>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
