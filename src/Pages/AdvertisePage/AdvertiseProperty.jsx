import React from 'react';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { RiAdvertisementLine } from "react-icons/ri";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { data: advertise = [], refetch } = useQuery({
    queryKey: ['advertise'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertiseProperty');
      return res.data;
    }
  });

  const handleMakeAdvertise = item => {
    axiosSecure.patch(`/advertiseProperty/${item._id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
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
                text: `${item.property_title} has been deleted.`,
                icon: "success"
              });
            }
          })
      }
    });
  };
  const total = advertise.length;

  return (
    <div className="my-5">
      <Helmet>
        <title>{'HRE-hub || Manage Advertise'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Advertise Properties Page</h2>

      <button className=" border-pink-800 border-2 text-pink-800 text-right my-5 p-5 rounded-xl  text-2xl font-bold">
        Total Advertise: {total}
      </button>

      {
        advertise.length !== 0 ?
          <div className="overflow-x-auto rounded-xl my-5 md:my-10 lg:my-15">
            <table className="table">

              <thead className="">
                <tr className="font-bold  bg-pink-800 text-white">

                  <th className="border-2 border-white ">SL.</th>
                  <th className="border-2 border-white ">Title</th>
                  <th className="border-2 border-white ">Location</th>
                  <th className="border-2 border-white ">Image</th>
                  <th className="border-2 border-white">Agent</th>
                  <th className="border-2 border-white ">Price($)</th>

                  <th className="border-2 border-white ">Action</th>

                </tr>
              </thead>
              <tbody>

                {
                  advertise?.map((item, index) => <tr key={item._id} className=" text-slate-600 font-semibold">

                    <td className="border-2 border-pink-800 text-pink-800 ">{index + 1}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_title}</td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.property_location}</td>
                    <td className="border-2 border-pink-800 text-pink-800 "><img className="rounded-lg w-40 h-20" src={item.property_image} alt="" /></td>
                    <td className="border-2 border-pink-800 text-pink-800 ">{item.agent_name}</td>
                    <td className="border-2 border-pink-800 text-green-600 font-bold ">{item.price_range}</td>

                    <td className="border-2 border-pink-800 text-pink-800 ">
                      {(item.advertise_status === "Advertised") ? <div onClick={() => handleDelete(item)} className=" rounded-lg p-2 font-bold bg-red-800 text-white">
                      <IoMdRemoveCircleOutline className="mx-auto text-2xl" />
                      </div> :

                        <span
                          onClick={() => handleMakeAdvertise(item)} className="">
                            <RiAdvertisementLine className="mx-auto text-4xl"/>
                            </span>

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