import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { data: advertise = [], refetch } = useQuery({
    queryKey: ['advertise'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertiseProperty');
      return res.data;
    }
  });


  const handleMakeAdvertise = item =>{
    axiosSecure.patch(`/advertiseProperty/${item._id}`)
    .then(res =>{
        console.log(res.data)
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${item.property_title} is Advertised Now!`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
};

const handleDelete = item => {
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

          axiosSecure.delete(`/advertiseProperty/${item._id}`)
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
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Advertise Properties Page</h2>
      {
        advertise.length !== 0 ?
          <div className="overflow-x-auto rounded-xl my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-pink-800">

                  <th className="border-2 border-pink-800 ">SL.</th>
                  <th className="border-2 border-pink-800 ">Title</th>
                  <th className="border-2 border-pink-800 ">Location</th>
                  <th className="border-2 border-pink-800 ">Property Image</th>
                  <th className="border-2 border-pink-800 ">Agent Name</th>
                  <th className="border-2 border-pink-800 ">Price Range ($)</th>

                  <th className="border-2 border-pink-800 ">Action</th>

                </tr>
              </thead>
              <tbody>

                {
                  advertise?.map((item, index) => <tr key={item._id} className="text-xl text-slate-600 font-semibold">

                    <td className="border-2 border-pink-800 text-pink-800 ">{index + 1}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_title}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_location}</td>
                    <td className="border-2 border-pink-800 text-pink-800 "><img className="rounded-lg w-40 h-20" src={item.property_image} alt="" /></td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.agent_name}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.price_range}</td>

                    <td className="border-2 border-pink-800 text-pink-800 ">
                      {(item.advertise_status === "Advertised") ? <div onClick={() => handleDelete(item)} className="font-bold text-red-600">
                          Remove
                        </div> :


                        
                        
                        <span
                      onClick={() => handleMakeAdvertise(item)} className="font-bold text-blue-600">Advertise</span>



                      }
                    </td>


                  </tr>)
                }
              </tbody>
            </table>
          </div>
          :
          <div>
            <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
          </div>
      }
    </div>
  );
};

export default AdvertiseProperty;