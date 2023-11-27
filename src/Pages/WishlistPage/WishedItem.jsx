import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { MdVerified } from "react-icons/md";

const WishedItem = ({ item }) => {
  const { data: wishedProperty = [], refetch } = useQuery({
    queryKey: ['wishedProperty'],
    queryFn: async () => {
      const res = await axiosSecure.get('/wishedProperty');
      return res.data;
    }
  })
  const axiosSecure = useAxiosSecure();
  const { _id, property_image, property_title, agent_name, agent_image, property_location, price_range, verification_status } = item;

  const handleDeleteProperty = item => {
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

        axiosSecure.delete(`/wishedProperty/${_id}`)
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
    <div className="rounded-lg shadow-lg">
      <img className="h-[300px] rounded-t-lg w-full" src={property_image} alt="" />
      <div class="border-l-8 border-black text-left rounded-b-lg p-3">
        <h3 className="text-2xl font-bold">{property_title}</h3>
        <p className="font-medium ">{property_location}</p>
        <div className="flex gap-3 my-2 items-center">
          <img src={agent_image} className="rounded-full w-10 h-10" alt="" />
          <p className="font-bold ">{agent_name}</p>

        </div>
        <p className="font-bold my-2">Price Range: $ {price_range}</p>
        <p className="font-bold flex items-center gap-2">Status: {verification_status} <MdVerified className="text-blue-800 text-2xl" /></p>
        <div className="flex gap-3">
          <Link to={`/dashboard/wishlist/${_id}`}>
            <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Make Offer </button>
          </Link>
          <button onClick={() => handleDeleteProperty(item)} className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Remove </button>
        </div>
      </div>

    </div>
  );
};

export default WishedItem;