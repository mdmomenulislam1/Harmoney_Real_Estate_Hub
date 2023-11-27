import React from 'react';
import useProperty from '../../Hooks/useProperties';
import ManageItem from './ManageItem';

const ManageProperties = () => {
  const [property, refetch] = useProperty();

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
                  {/* <th className="border-2 border-pink-800 ">Status </th> */}
                  <th className="border-2 border-pink-800 ">Action</th>
                  {/* <th className="border-2 border-pink-800 ">Reject</th> */}
                </tr>
              </thead>
              <tbody>

                {
                  property?.map((Item, index) => <ManageItem
                    key={Item._id}
                    Item={Item}
                    index={index}
                    refetch={refetch}
                    ></ManageItem>)
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