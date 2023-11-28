import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MySoldProperties = () => {


  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments');
      return res.data;
    }
  });

  const paymentData = payment?.filter((item) => item?.agentEmail === user?.email);

  const total = paymentData.reduce((pre, current) => pre + current.offeredAmount, 0)

  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Sold Page</h2>

      {
        paymentData?.length !== 0 ?
          <div className="overflow-x-auto rounded-xl my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-pink-800">

                  <th className="border-2 border-pink-800 ">SL.</th>
                  <th className="border-2 border-pink-800 ">Property Title</th>
                  <th className="border-2 border-pink-800 ">Property Location</th>
                  <th className="border-2 border-pink-800 ">Buyer Email</th>
                  <th className="border-2 border-pink-800 ">Buyer Name</th>
                  <th className="border-2 border-pink-800 ">Sold Price ($)</th>

                </tr>
              </thead>
              <tbody>

                {
                  paymentData?.map((item, index) => <tr key={item._id} className="text-xl text-pink-800 font-semibold">

                    <td className="border-2 border-pink-800 ">{index + 1}</td>
                    <td className="border-2 border-pink-800 ">{item.propertyName}</td>
                    <td className="border-2 border-pink-800 ">{item.propertyLocation}</td>
                    <td className="border-2 border-pink-800 ">{item.buyerEmail}</td>
                    <td className="border-2 border-pink-800 ">{item.buyerName}</td>
                    <td className="border-2 border-pink-800 font-bold text-green-600 text-2xl ">{item.offeredAmount}</td>

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

      <button className="w-full bg-pink-800 text-white mx-auto text-center my-5 p-5 rounded-xl  text-2xl font-bold">
        Total Revenue: {total}  $
      </button>
    </div>
  );
};

export default MySoldProperties;