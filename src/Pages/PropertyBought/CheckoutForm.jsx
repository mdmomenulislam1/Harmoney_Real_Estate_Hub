import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Firebase/AuthProvider";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const cart = useLoaderData();

    const {_id, propertyName, propertyLocation, property_image, orderedDate, agentName, buyerName, agentEmail, buyerEmail, offeredAmount, status} = cart || {};


    const totalPrice = offeredAmount;

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        }
        )

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    propertyName,
                    propertyLocation,
                    property_image,
                    agentName,
                    agentEmail,
                    buyerEmail,
                    buyerName,
                    offeredAmount,
                    status: "Bought",
                    orderedDate,
                    transactionId: paymentIntent.id,
                    paymentDate: new Date()
                     
                }

                const res = await axiosSecure.put(`/offeredProperty/${_id}`, payment);
                console.log('payment saved', res.data);
                
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for payment",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="w-full text-center border-x-4 rounded-lg border-b-4 border-blue-800">
           
           <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Name</p>
            <input type="text" name="property_name" id="" required defaultValue={propertyName} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>
          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Location</p>
            <input type="text" name="property_location" id="" required defaultValue={propertyLocation} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Property Price ($)</p>
            <input type="text" name="property_price" id="" required defaultValue={offeredAmount} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Agent Name</p>
            <input type="text" name="property_name" id="" required defaultValue={agentName} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Your Name</p>
            <input type="text" name="buyer_name" id="" required defaultValue={user?.displayName} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          <div className="flex justify-center items-center w-full">
            <p className=" text-black font-bold w-[200px]">Your Email</p>
            <input type="text" name="buyer_name" id="" required defaultValue={user?.email} disabled className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
          </div>

          
            <p className=" text-black mx-auto mt-5 text-center font-bold w-[200px]">Payment Please</p>
            <CardElement
            className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg mx-auto"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            
          
            
            <button className=" bg-blue-800 hover:bg-yellow-800 w-full p-3 text-white font-bold border rounded-b-lg" type="submit"

            >
                Pay
            </button>
            <p className="text-red-600 my-5 font-bold">{error}</p>

            {transactionId && <p className="text-green-600 my-5 font-bold">Congratulation! Your payment has been Completed.
            
                 Your Transaction ID: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;