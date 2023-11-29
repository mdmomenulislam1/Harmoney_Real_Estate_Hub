import React from 'react';
// import useReview from '../../Hooks/useReview';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageReports = () => {
  const axiosSecure = useAxiosSecure();
  const { data: report = [], refetch } = useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      const res = await axiosSecure.get('/report');
      return res.data;
    }
  })

  const handleDeleteReport = item => {
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

        axiosSecure.delete(`/report/${item._id}`)
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
    <div className="mx-2 md:mx-6 lg:mx-10 my-5 md:my-8 lg:my-12 text-center">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Manage Reports Page</h2>
      {
        (report.length > 0)
          ?
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8 justify-center items-center my-5">

            {
              report?.map(item => <div key={item._id}>

                <div className="text-center rounded-t-lg border-x-2 border-t-2 border-pink-800 h-84 p-5">
                  <h3 className='text-3xl font-bold text-pink-800 my-2'>
                    {item?.property_title
                    }
                  </h3>
                  <h3 className='text-3xl font-bold text-pink-800 my-2'>
                    Agent: 
                    {item?.agent_name}
                  </h3>
                  <div>
                  <h3 className='text-3xl font-bold text-pink-800 my-2'>
Reporter Name {item?.reporter_name}
                  </h3>

                  <h3 className='text-3xl font-bold text-pink-800 my-2'>
                   Reporter Email: 
                    {item?.reporter_email}
                  </h3>
                  </div>
              
                  <p className="text-justify font-semibold">{item?.report}</p>
                  <p className=" font-medium">{item?.report_time}</p>
                </div>
                <button onClick={() => handleDeleteReport(item)} className="hover:bg-yellow-800 bg-pink-800 w-full p-3 text-white font-bold border rounded-b-lg"> Remove the Report</button>
              </div>)
            }
            
          </div>
          :
          <div>
            <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
          </div>
      }
    </div>
  );
};

export default ManageReports;