import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import './payment.css';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51I9Bo3G6iw0GQs4INvN6zZOU4TueB9gaoSiqP3YxSFWVDkqmL6OCnA8MMJvb5sW2UPrOiMyvYXBIpPUel1vGJwbW00MrQMcYC0");

export default function Payment() {

    return (
            <div className="display">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        );
}
