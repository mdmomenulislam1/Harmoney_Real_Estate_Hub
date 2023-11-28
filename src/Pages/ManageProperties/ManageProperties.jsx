import React from 'react';
import useProperty from '../../Hooks/useProperties';
import ManageItem from './ManageItem';
import { FaXmark } from 'react-icons/fa6';
import { IoMdCheckmark } from 'react-icons/io';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageProperties = () => {
  // const [property, refetch] = useProperty();
  const axiosSecure = useAxiosSecure();
  const { data: property = [], refetch } = useQuery({
    queryKey: ['property'],
    queryFn: async () => {
      const res = await axiosSecure.get('/property');
      return res.data;
    }
  });

  const handleVerify = item => {

    const advertiseData = {
      property_title: item.property_title,
      property_image: item.property_image,
      property_location: item.property_location,
      agent_name: item.agent_name,
      agent_email: item.agent_email,
      agent_image: item.agent_image,
      price_range: item.price_range,
      verification_status: "Verified",
      property_description: item.property_description,
      advertise_status: " "
    }

    axiosSecure.post('/advertiseProperty', advertiseData)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.property_title} is ready for Ads Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })

    const propertyData = {
      property_title: item.property_title,
      property_image: item.property_image,
      property_location: item.property_location,
      agent_name: item.agent_name,
      agent_email: item.agent_email,
      agent_image: item.agent_image,
      price_range: item.price_range,
      verification_status: "Verified",
      property_description: item.property_description
    }
    axiosSecure.patch(`/property/${item._id}`, propertyData)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is verified Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };


  const handleReject = item => {

    const propertyData = {
      property_title: item.property_title,
      property_image: item.property_image,
      property_location: item.property_location,
      agent_name: item.agent_name,
      agent_email: item.agent_email,
      agent_image: item.agent_image,
      price_range: item.price_range,
      verification_status: "Rejected",
      property_description: item.property_description
    }
    axiosSecure.patch(`/property/${item._id}`, propertyData )
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is rejected!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };



  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Manage Properties Page</h2>

      {
        property?.length !== 0 ?
          <div className="overflow-x-auto rounded-xl my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-pink-800">

                  <th className="border-2 border-pink-800 ">SL.</th>
                  <th className="border-2 border-pink-800 ">Title</th>
                  <th className="border-2 border-pink-800 ">Location</th>
                  <th className="border-2 border-pink-800 ">Agent Email</th>
                  <th className="border-2 border-pink-800 ">Agent Name</th>
                  <th className="border-2 border-pink-800 ">Price Range ($)</th>

                  <th className="border-2 border-pink-800 ">Action</th>

                </tr>
              </thead>
              <tbody>

                {
                  property?.map((item, index) => <tr key={item._id} className="text-xl text-slate-600 font-semibold">

                    <td className="border-2 border-pink-800 text-pink-800 ">{index + 1}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_title}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_location}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.agent_email}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.agent_name}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.price_range}</td>

                    <td className="border-2 border-pink-800 text-pink-800 ">
                      {(item.verification_status !== "Pending") ? <span className="font-bold text-blue-600">{item.verification_status}</span> :

                      <>
                        <div className="font-bold text-red-600">
                          {item.verification_status}
                        </div>

                        <div className="text-center flex gap-2">
                          <button onClick={() => handleVerify(item)} className="rounded-lg bg-blue-600 text-white font-bold p-2 text-2xl"> <IoMdCheckmark />  </button>
                          <button onClick={() => handleReject(item)} className="rounded-lg bg-red-600 p-2 text-white font-extrabold text-2xl"><FaXmark /> </button>
                        </div> </>
            
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

export default ManageProperties;