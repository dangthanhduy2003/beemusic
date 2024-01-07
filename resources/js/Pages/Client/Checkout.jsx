// Checkout.jsx
import React from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("your_stripe_public_key");

const Checkout = ({ auth, productId, priceId }) => {
    return (
        <DefaultLayout auth={auth}>
            <div>
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm productId={productId} priceId={priceId} />
                </Elements>
            </div>
        </DefaultLayout>
    );
};

export default Checkout;
