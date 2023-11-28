import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useOffered from '../../Hooks/useOffered';
// import RequestedItem from './RequestedItem';
import { FaXmark } from 'react-icons/fa6';
import { IoMdCheckmark } from 'react-icons/io';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const RequestedProperties = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: offer = [], refetch } = useQuery({
    queryKey: ['offer'],
    queryFn: async () => {
      const res = await axiosSecure.get('/offeredProperty');
      return res.data;
    }
  });

  const offeredData = offer?.filter((item) => item?.agentEmail === user?.email);

  



  const handleReject = item => {

    const rejectData = {
      propertyName: item.propertyName,
      propertyLocation: item.propertyLocation,
      property_image: item.property_image,
      agentName: item.agentName,
      agentEmail: item.agentEmail,
      buyerName: item.buyerName,
      buyerEmail: item.buyerEmail,
      offeredAmount: item.offeredAmount,
      orderedDate: item.orderedDate,
      status: "Rejected"
    }
    axiosSecure.patch(`/offeredProperty/${item._id}`, rejectData )
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.propertyName} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };

  const handleAccept = item => {
    const approveData = {
      propertyName: item.propertyName,
      propertyLocation: item.propertyLocation,
      property_image: item.property_image,
      agentName: item.agentName,
      agentEmail: item.agentEmail,
      buyerName: item.buyerName,
      buyerEmail: item.buyerEmail,
      offeredAmount: item.offeredAmount,
      orderedDate: item.orderedDate,
      status: "Approved"
    }

    axiosSecure.patch(`/offeredProperty/${item._id}`, approveData)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.propertyName} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }


  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Offered Property Page</h2>
      {
        offeredData?.length !== 0 ?
          <div className="overflow-x-auto rounded-xl my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-pink-800">

                  <th className="border-2 border-pink-800 ">SL.</th>
                  <th className="border-2 border-pink-800 ">Title</th>
                  <th className="border-2 border-pink-800 ">Location</th>
                  <th className="border-2 border-pink-800 ">Buyer Email</th>
                  <th className="border-2 border-pink-800 ">Buyer Name</th>
                  <th className="border-2 border-pink-800 ">Offered ($)</th>
                  <th className="border-2 border-pink-800 ">Action </th>

                </tr>
              </thead>
              <tbody>

                {
                  offeredData?.map((item, index) => <tr key={item._id} className="text-xl text-pink-800 font-semibold">

                    <td className="border-2 border-pink-800 ">{index + 1}</td>
                    <td className="border-2 border-pink-800 ">{item.propertyName}</td>
                    <td className="border-2 border-pink-800 ">{item.propertyLocation}</td>
                    <td className="border-2 border-pink-800 ">{item.buyerEmail}</td>
                    <td className="border-2 border-pink-800 ">{item.buyerName}</td>
                    <td className="border-2 border-pink-800 ">{item.offeredAmount}</td>



                    <td className="border-2 border-pink-800 ">


                      {
                        item.status === "Pending" ?
                          <div className="font-bold text-yellow-600 text-center">{item.status}
                            <div className="flex items-center justify-center gap-2 my-1">
                              <button onClick={() => handleAccept(item)} className="p-2 font-extrabold text-3xl bg-green-600 text-white rounded-lg"> <IoMdCheckmark />  </button>
                              <button onClick={() => handleReject(item)} className="p-2 font-extrabold text-3xl bg-red-600 text-white rounded-lg"><FaXmark /> </button>
                            </div>
                          </div> :
                          <div className="font-bold text-2xl text-pink-800 text-center">
                            {
                              item.status
                            }
                          </div>
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

export default RequestedProperties;