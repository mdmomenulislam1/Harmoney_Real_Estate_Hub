import React from 'react';
import useReview from '../../Hooks/useReview';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageReviews = () => {
  const [review, refetch] = useReview();
  const axiosSecure = useAxiosSecure();


  const handleDeleteReview = _id => {
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

        axiosSecure.delete(`/review/${_id}`)
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
    <div>
      <h2 className="text-2xl">Manage Reviews</h2>
      <div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {
          review?.map(review => <div key={review._id}>

            <div className="text-center rounded-lg p-5 shadow-lg">
              <h3 className='text-3xl font-bold text-yellow-500 my-2'>
                {review?.property_title
                }
              </h3>
              <h3 className='text-4xl font-bold text-yellow-500 my-2'>
                {review?.agent_name}
              </h3>
              <Rating className='mx-auto my-2' style={{ maxWidth: 250 }} value={parseInt(review?.rating)} />
              <FaQuoteRight className=' text-5xl mx-auto my-5' />
              <p className=" font-semibold">{review?.review}</p>
              <p className=" font-medium">{review?.review_time}</p>
            </div>
            <button onClick={() => handleDeleteReview(review._id)} className="hover:bg-yellow-800 bg-yellow-600 w-full p-3 text-white font-bold border rounded-lg"> Remove the Review</button>


          </div>)
        }

      </div>

    </div>
  );
};

export default ManageReviews;