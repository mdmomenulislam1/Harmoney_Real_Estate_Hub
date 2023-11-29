import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";


const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch('https://server-site-psi-six.vercel.app/review')
      .then(res => res.json())
      .then(data => {
        const difference = data.sort((a, b) => a?.review_time - b.review_time);
        const latest = data.slice().sort((a, b ) => a?._id - b?._id);
        setReviews(difference)
      })
  }, [])

  return (
    <section className="my-20 max-w-screen-xl mx-auto">

      {
        reviews.length !== 0 ?
        <Swiper
        navigation={true} modules={[Navigation]} className="my-10 mySwiper">
        {
          reviews?.map(review => <SwiperSlide key={review._id}>

            <div className=' mx-28 text-center'>
              <h3 className='text-3xl font-bold text-pink-800 my-2'>
                {review?.property_title
                }
              </h3>
              <Rating className='mx-auto my-2' style={{ maxWidth: 200 }} value={parseInt(review?.rating)} />
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
      :
      <div>
          <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
        </div>
      }
    </section>
  );
};

export default Review;