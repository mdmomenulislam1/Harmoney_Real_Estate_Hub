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
    <div>
      <h2 className="text-2xl">Property Bought Page</h2>
      {
        offer?.length !== 0 ?
          <div className="overflow-x-auto my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-yellow-600">

                  <th className="border-2 border-yellow-600 ">Title</th>
                  <th className="border-2 border-yellow-600 ">Location</th>
                  <th className="border-2 border-yellow-600 ">Buyer Email</th>
                  <th className="border-2 border-yellow-600 ">Buyer Name</th>
                  <th className="border-2 border-yellow-600 ">Offered ($)</th>
                  <th className="border-2 border-yellow-600 ">Status </th>
                  <th className="border-2 border-yellow-600 ">Accept</th>
                  <th className="border-2 border-yellow-600 ">Reject</th>
                </tr>
              </thead>
              <tbody>

                {
                  offer?.map((Item) => <RequestedItem
                    key={Item._id}
                    Item={Item}
                    setOffer={setOffer}
                    offer={offer}
                    ></RequestedItem>)
                }
              </tbody>
            </table>
          </div>
          :
          <h2>
            No Data Found
          </h2>
      }
    </div>
  );
};

export default RequestedProperties;