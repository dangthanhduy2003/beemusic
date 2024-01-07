import React from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";

const Buy = ({ auth, products }) => {
    const handleBuy = (productId, priceId) => {
        // Tạo URL checkout sử dụng productId và priceId
        const checkoutUrl = `/checkout/${productId}/${priceId}`;

        // Chuyển hướng đến URL checkout
        window.location.href = checkoutUrl;
    };

    return (
        <DefaultLayout auth={auth}>
            <div>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-md p-4"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {product.name}
                            </h2>
                            {product.image && (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="mb-2 rounded-md"
                                    style={{ maxHeight: "150px" }}
                                />
                            )}
                            <p className="text-gray-500 mb-2">
                                {product.description}
                            </p>
                            <p className="text-green-500 font-bold">
                                Price: ${product.price}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-700"
                                onClick={() =>
                                    handleBuy(product.id, product.priceId)
                                }
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Buy;
