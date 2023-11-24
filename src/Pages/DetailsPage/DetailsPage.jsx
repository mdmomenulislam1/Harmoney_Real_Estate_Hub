
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";

const DetailsPage = () => {
  const property = useLoaderData();
  const { _id, property_image, property_title, agent_name, agent_image, property_description, property_location, price_range, verification_status } = property;

  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
      .then(data => {
        const specificReview = data?.filter((item) => item.property_title === property?.property_title);
        setReviews(specificReview);
      })
  }, [])


  const handleWishlist = () => {
    const wishedPropertyData = {
      property_image, property_title, property_location, agent_name, agent_image, verification_status, price_range, buyer_name: user?.displayName, buyer_email: user?.email
    }

    fetch('http://localhost:5000/wishedProperty', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishedPropertyData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${property_title} has been added in the wishlist`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const review = form.review.value;
    const review_time = Date();

    const reviewData = {
      property_title,
      rating,
      review,
      review_time,
      reviewer_name: user?.displayName,
      reviewer_email: user?.email,
      reviewer_image: user?.photoURL,
    }


    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Review is added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

  }


  return (
    <div className="mx-5 md:mx-10 lg:mx-15 my-4 md:my-8 lg:my-12">
      <Helmet>
        <title>{'Corner Cafe | Food Details'}</title>
      </Helmet>
      <h1 data-aos="zoom-in" className=" p-5 text-4xl font-bold text-center border-t-8 text-yellow-600 rounded-2xl border-yellow-600 mt-8 md:mt-12 lg:mt-16 ">Property Details Page</h1>
      <div className="border-2 border-b-2 rounded-2xl border-yellow-600">
        <div className="">
          <div>
            <img src={property_image} className="rounded-t-lg h-[600px] shadow-2xl w-full" alt="car!" />
          </div>
          <div className="card w-full relative flex flex-row justify-around items-center p-10 ">
            <div className="flex justify-between items-center my-10">
              <div data-aos="flip-left" className="w-1/2 border-l-8 px-3 rounded-2xl border-yellow-600">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">{property_title}</h2>
                <h2 className="text-2xl font-semibold mb-2">Location: {property_location}</h2>
                <div className="flex items-center gap-3 py-2">
                  <img src={agent_image} className="w-10 h-10 rounded-full" alt="" />
                  <h2 className="text-2xl font-bold mb-2">Agent: {agent_name}</h2>
                </div>


                <p className=" font-bold my-3 text-yellow-600">Status: {verification_status}</p>
                <p className="text-2xl font-bold my-3 text-yellow-600">Price Range: {price_range}</p>
              </div>

              <div data-aos="flip-right" className="w-1/2">
                <h2 className="text-4xl font-bold mb-4">Property Description</h2>
                <p className="text-justify font-semibold">{property_description}</p>
                <button onClick={handleWishlist} className="w-full bg-yellow-600 text-white mx-auto text-center my-5 p-5 font-bold rounded-full">
                  Add to Wishlist
                </button>


              </div>
            </div>
          </div>

          <div>

            <section className="my-20 max-w-screen-xl mx-auto">

              <Swiper
                navigation={true} modules={[Navigation]} className="my-10 mySwiper">
                {
                  reviews?.map(review => <SwiperSlide key={review._id}>

                    <div className=' mx-28 text-center'>
                      <h3 className='text-3xl font-bold text-yellow-500 my-2'>
                        {review?.property_title
                        }
                      </h3>
                      <Rating className='mx-auto my-2' style={{ maxWidth: 250 }} value={review?.rating} />
                      <FaQuoteRight className=' text-8xl mx-auto my-5' />
                      <p className=" font-semibold">{review?.review}</p>
                      <div className='flex justify-center items-center gap-5 my-5'>
                        <img className="w-20 h-20 rounded-full" src={review?.reviewer_image} alt="" />
                        <h3 className='text-4xl font-bold text-yellow-500 my-2'>
                          {review?.reviewer_name
                          }
                        </h3>
                      </div>

                    </div>
                  </SwiperSlide>)
                }

              </Swiper>

              <div className="grid justify-center items-center">

                {/* The button to open modal */}
                <a href="#my_modal_8" className="btn">Write a review</a>
                {/* Put this part before </body> tag */}
                <div className="modal" role="dialog" id="my_modal_8">
                  <div className="modal-box">
                    <h1 className=" p-5 text-4xl font-bold border-l-8 text-yellow-600 rounded-2xl border-yellow-600 border-b-8 mt-8 md:mt-12 lg:mt-16 ">Leave a review</h1>
                    <form onSubmit={handleReview} action="" method="post" className="border-2 rounded-2xl border-yellow-600 p-5 w-full">
                      <div className="grid grid-cols-1">

                        <div className="flex justify-center items-center w-full">
                          <p className=" text-black font-bold w-[200px]">Rating</p>
                          <input type="number" min={1} max={5} name="rating" id="" required placeholder="Property Rating" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
                        </div>
                        <div className="flex justify-center items-center w-full">
                          <p className=" text-black font-bold w-[200px]">Review</p>
                          <textarea type="text" name="review" id="" required placeholder="Food Description" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
                        </div>
                        <br />
                      </div>
                      <button className="hover:bg-yellow-800 bg-yellow-600 w-full p-3 text-white font-bold border rounded-lg" type="submit"> Add the Review</button>
                    </form>
                    <div className="modal-action">
                      <a href="#" className="btn">Close!</a>
                    </div>
                  </div>
                </div>
              </div>

            </section>



          </div>

        </div>

      </div>

    </div>


  );
};

export default DetailsPage;