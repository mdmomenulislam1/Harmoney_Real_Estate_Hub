
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div className="my-5">
            <Helmet>
                <title>{'HRE-hub || Payment System'}</title>
            </Helmet>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Payment Page</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;