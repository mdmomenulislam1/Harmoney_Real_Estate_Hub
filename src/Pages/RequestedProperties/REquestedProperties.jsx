import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useOffered from '../../Hooks/useOffered';
import RequestedItem from './RequestedItem';


const RequestedProperties = () => {
  const [offer, setOffer] = useState([]);
  const { user } = useContext(AuthContext);
  const [offered] = useOffered();
  useEffect(() => {
    const offeredData = offered?.filter((item) => item?.agentEmail === user?.email);
    setOffer(offeredData);
  }, [offered, user]);


  return (
    <div className="my-5">
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Offered Property Page</h2>
      {
        offer?.length !== 0 ?
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
                  offer?.map((Item, index) => <RequestedItem
                    key={Item._id}
                    Item={Item}
                    index={index}
                    setOffer={setOffer}
                    offer={offer}
                    ></RequestedItem>)
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