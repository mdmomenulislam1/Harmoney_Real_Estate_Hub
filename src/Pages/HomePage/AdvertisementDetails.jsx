
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
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
import { MdVerified } from 'react-icons/md';

const AdvertisementDetails = () => {
  const property = useLoaderData();
  const { _id, property_image, property_title, agent_name, agent_image, property_description, agent_email, property_location, price_range, verification_status } = property;

  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/review')
      .then(res => res.json())
      .then(data => {
        const specificReview = data?.filter((item) => item.property_title === property?.property_title);
        setReviews(specificReview);
      })
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/report')
      .then(res => res.json())
      .then(data => {
        const specificReport = data?.filter((item) => item.property_title === property?.property_title);
        setReports(specificReport);
      })
  }, []);


  const handleWishlist = () => {
    const wishedPropertyData = {
      property_image, property_title, property_location, agent_name, agent_image, agent_email, verification_status, price_range, buyer_name: user?.displayName, buyer_email: user?.email
    }
    if (user?.email === agent_email) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${property_title} is your own property`,
        showConfirmButton: false,
        timer: 1500
      });
    };




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
    const time = new Date(2023, 11, 1, 0, 0, 0);
    const review_time = time.toISOString();

    const reviewData = {
      property_title,
      rating,
      review,
      agent_name,
      review_time,
      reviewer_name: user?.displayName,
      reviewer_email: user?.email,
      reviewer_image: user?.photoURL,
    }

    if (user?.email === agent_email) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${property_title} is your own property`,
        showConfirmButton: false,
        timer: 1500
      });
    };


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


  const handleReport = (e) => {
    e.preventDefault();
    const form = e.target;
    const report = form.report.value;
    const time = new Date(2023, 11, 1, 0, 0, 0);
    const report_time = time.toISOString();

    const reportData = {
      property_title,
      report,
      agent_name,
      report_time,
      reporter_name: user?.displayName,
      reporter_email: user?.email,
      reporter_image: user?.photoURL,
    }

    if (user?.email === agent_email) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${property_title} is your own property`,
        showConfirmButton: false,
        timer: 1500
      });
    };


    fetch("http://localhost:5000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Report is added successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });

  }

  return (
    <div className="mx-5 md:mx-10 lg:mx-15 my-4 md:my-8 lg:my-12">
      <Helmet>
        <title>{'HRE-hub || Property Details'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Details Page</h2>
      <div className="border-2 border-b-2 rounded-2xl border-pink-800">
        <div className="">
          <div>
            <img src={property_image} className="rounded-t-lg h-[600px] shadow-2xl w-full" alt="car!" />
          </div>
          <div className="card w-full relative flex flex-row justify-around items-center p-10 ">
            <div className="flex justify-between items-center my-10">
              <div data-aos="flip-left" className="w-1/2 border-l-8 px-3 rounded-2xl border-pink-800">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2">{property_title}</h2>
                <h2 className="text-2xl font-semibold mb-2">Location: {property_location}</h2>
                <div className="flex items-center gap-3 py-2">
                  <img src={agent_image} className="w-10 h-10 rounded-full" alt="" />
                  <h2 className="text-2xl font-bold mb-2"> {agent_name}</h2>
                </div>


                <p className="font-bold flex items-center gap-2">Status: {verification_status} <MdVerified className="text-blue-800 text-2xl" /></p>
                <p className="text-2xl font-bold my-3 text-pink-800">Price Range: {price_range}</p>
              </div>

              <div data-aos="flip-right" className="w-1/2">
                <h2 className="text-4xl font-bold mb-4">Property Description</h2>
                <p className="text-justify font-semibold">{property_description}</p>
                <button onClick={handleWishlist} className="w-full bg-pink-800 text-white mx-auto text-center my-5 p-3 rounded-xl  text-2xl font-bold">
                  Add to Wishlist
                </button>


              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold max-w-lg mx-auto">Property Review</h2>
            {
              reviews?.length !== 0 ?
                <section className="my-20 max-w-screen-xl mx-auto">

                  <Swiper
                    navigation={true} modules={[Navigation]} className="my-10 mySwiper">
                    {
                      reviews?.map(review => <SwiperSlide key={review._id}
                      className="">

                        <div className=' mx-28 text-center'>
                          <h3 className='text-3xl font-bold text-pink-800 my-2'>
                            {review?.property_title
                            }
                          </h3>
                          <Rating className='mx-auto my-2' style={{ maxWidth: 150 }} value={parseInt(review?.rating)} />
                          <FaQuoteRight className=' text-4xl mx-auto my-5' />
                          <p className=" font-semibold">{review?.review}</p>
                          <div className='flex justify-center items-center gap-5 my-5'>
                            <img className="w-16 h-16 rounded-full" src={review?.reviewer_image} alt="" />
                            <h3 className='text-2xl font-bold text-pink-800 my-2'>
                              {review?.reviewer_name
                              }
                            </h3>
                          </div>

                        </div>
                      </SwiperSlide>)
                    }

                  </Swiper>



                </section>
                :
                <>
                </>
            }


            <div className="grid justify-center items-center mb-5">


              <a href="#my_modal_8" className="rounded-xl bg-pink-800 text-white text-2xl font-bold p-3">Review this property</a>

              <div className="modal" role="dialog" id="my_modal_8">
                <div className="modal-box">
                  <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Leave a review</h2>
                  <form onSubmit={handleReview} action="" method="post" className="border-2 rounded-2xl border-pink-800 p-5 w-full">
                    <div className="grid grid-cols-1">

                      <div className="flex justify-center items-center w-full">
                        <p className=" text-black font-bold w-[200px]">Rating</p>
                        <input type="number" min={1} max={5} name="rating" id="" required placeholder="Property Rating" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
                      </div>
                      <div className="flex justify-center items-center w-full">
                        <p className=" text-black font-bold w-[200px]">Review</p>
                        <textarea type="text" name="review" id="" required placeholder="Your Review ...........!" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
                      </div>
                      <br />
                    </div>
                    <button className="hover:bg-yellow-800 bg-pink-800 w-full p-3 text-white font-bold border rounded-lg" type="submit"> Add the Review</button>
                  </form>
                  <div className="modal-action flex justify-center">
                    <a href="#" className="rounded-xl bg-pink-800 text-white p-3 font-semibold ">Close!</a>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold max-w-lg mx-auto my-5">Property Report</h2>


            {
              reports.length !== 0 ?
                <div className="my-10 grid lg:grid-cols-3 mx-10 justify-center items-center gap-5">

                 
                    {
                      reports?.map(review => <div key={review._id}
                      
                       className='shadow-lg rounded-lg p-10 text-center'>
                          <h3 className='text-2xl font-bold text-pink-800 my-2'>
                            {review?.property_title
                            }
                          </h3>
                          
                          <p className=" font-semibold text-justify">{review?.report}</p>
                          <div className='flex justify-center items-center gap-5 my-5'>
                            <img className="w-10 h-10 rounded-full" src={review?.reporter_image} alt="" />
                            <h3 className=' font-bold text-pink-800 my-2'>
                              {review?.reporter_name
                              }
                            </h3>
                          </div>

                        </div>
                      )
                    }

                  </div>
                :
                <>
                </>
            }



            <div className="grid justify-center items-center mb-5">


              <a href="#my_modal_9" className="rounded-xl bg-pink-800 text-white text-2xl font-bold p-3">Report this property</a>

              <div className="modal" role="dialog" id="my_modal_9">
                <div className="modal-box">
                  <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Leave a Report</h2>
                  <form onSubmit={handleReport} action="" method="post" className="border-2 rounded-2xl border-pink-800 p-5 w-full">
                    <div className="grid grid-cols-1">

                      <div className="flex justify-center items-center w-full">
                        <p className=" text-black font-bold w-[200px]">Report Description</p>
                        <textarea type="text" name="report" id="" required placeholder="Your Review ...........!" className="m-3 w-3/4 p-3 text-black font-semibold border rounded-lg" />
                      </div>
                      <br />
                    </div>
                    <button className="hover:bg-yellow-800 bg-pink-800 w-full p-3 text-white font-bold border rounded-lg" type="submit"> Add the Report</button>
                  </form>
                  <div className="modal-action flex justify-center">
                    <a href="#" className="rounded-xl bg-pink-800 text-white p-3 font-semibold ">Close!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AdvertisementDetails;