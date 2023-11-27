import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useReview from '../../Hooks/useReview';
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
    const { data: review = [], refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review');
            return res.data;
        }
    })

  const { user } = useContext(AuthContext);
  const reviewData = review?.filter((item) => item?.reviewer_email === user?.email);

  const handleDeleteReview = item => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.delete(`/review/${item._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
        }
    });
}
  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Reviews Page</h2>
     
      {
        reviewData.length !== 0 ? <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 justify-center items-center my-5">
        {
          reviewData?.map(item => <div key={item._id}>

            <div className="text-center rounded-t-lg border-x-2 border-t-2 border-pink-800 h-84 p-5">
              <h3 className='text-3xl font-bold text-pink-800 my-2'>
                {item?.property_title
                }
              </h3>
              <h3 className='text-4xl font-bold text-pink-800 my-2'>
                {item?.agent_name}
              </h3>
              <Rating className='mx-auto my-2' style={{ maxWidth: 250 }} value={parseInt(item?.rating)} />
              <FaQuoteRight className=' text-5xl mx-auto my-5' />
              <p className=" font-semibold">{item?.review}</p>
              <p className=" font-medium">{item?.review_time}</p>
            </div>
            <button onClick={() => handleDeleteReview(item)} className="hover:bg-yellow-800 bg-pink-800 w-full p-3 text-white font-bold border rounded-b-lg"> Remove the Review</button>


          </div>)
        }

      </div>:
      <div>
      <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
    </div>
      }
    </div>
  );
};

export default MyReviews;