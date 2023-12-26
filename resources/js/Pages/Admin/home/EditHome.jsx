import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import InputError from "@/Components/InputError";

export default function EditHome({ auth, home }) {
  const [homeData, setHomeData] = useState({
    name: home.name,
  });

  // Hiển thị lỗi
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", homeData.name);

      const response = await axios.post(`/home/update/${home.id}`, formData);

      if (response.status === 200) {
        // Reload the page
        window.location.href = "/categories/list";
    
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="p-8 w-full">
        <div>
          <h2 className="font-semibold text-white text-center text-2xl">
            Sửa home
          </h2>
        </div>
        <div className="bg-neutral-400 rounded mt-4 p-14">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Tên
              </label>
              <input
                type="text"
                name="name"
                value={homeData.name}
                onChange={(e) =>
                  setHomeData({ ...homeData, name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {formErrors.name && (
                <InputError className="mt-2" message={formErrors.name[0]} />
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => Inertia.visit(route("home.listHome"))}
                className="text-red-700 mt-8"
              >
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
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
