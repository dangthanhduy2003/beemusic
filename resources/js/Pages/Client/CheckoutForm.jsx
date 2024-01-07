// CheckoutForm.jsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = ({ productId, priceId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");

    const handlePayment = async () => {
        setErrorMessage(""); // Reset error message

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const { token } = await stripe.createToken(cardElement);

            // Gửi token lên server để xử lý thanh toán
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token.id,
                    productId,
                    priceId,
                }),
            });

            if (response.ok) {
                // Thanh toán thành công, chuyển hướng hoặc hiển thị thông báo
                console.log("Payment successful!");
            } else {
                // Xử lý lỗi từ server
                const responseData = await response.json();
                setErrorMessage(responseData.error);
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setErrorMessage("An error occurred while processing your payment.");
        }
    };

    return (
        <div>
            <CardElement />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 hover:bg-blue-700"
                onClick={handlePayment}
            >
                Pay Now
            </button>
        </div>
    );
};

export default CheckoutForm;
