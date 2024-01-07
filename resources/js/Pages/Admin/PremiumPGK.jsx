import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";

const PremiumPGK = ({ auth }) => {
    const [productInfo, setProductInfo] = useState({
        name: "",
        type: "service",
        description: "",
        image: "",
        duration: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductInfo((prevProductInfo) => ({
            ...prevProductInfo,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/create-product", productInfo);

            // Xử lý phản hồi từ server nếu cần
            console.log(response.data);

            // Đặt lại trạng thái của form sau khi thêm sản phẩm thành công
            setProductInfo({
                name: "",
                type: "service",
                description: "",
                image: "",
                duration: 1,
            });
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error creating product:", error);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div>
                <h1>Create Premium Product</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={productInfo.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Type:
                        <input
                            type="text"
                            name="type"
                            value={productInfo.type}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={productInfo.description}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="image"
                            value={productInfo.image}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Duration (months):
                        <select
                            name="duration"
                            value={productInfo.duration}
                            onChange={handleChange}
                        >
                            <option value="1">1 month</option>
                            <option value="3">3 months</option>
                            <option value="6">6 months</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Create Product</button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default PremiumPGK;
