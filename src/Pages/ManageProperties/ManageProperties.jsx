import React from 'react';
import useProperty from '../../Hooks/useProperties';
import ManageItem from './ManageItem';

const ManageProperties = () => {
  const [property, refetch] = useProperty();

  return (
    <div>
      <h2 className="text-2xl">Manage Properties</h2>
      {
        property?.length !== 0 ?
          <div className="overflow-x-auto my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-yellow-600">

                  <th className="border-2 border-yellow-600 ">Title</th>
                  <th className="border-2 border-yellow-600 ">Location</th>
                  <th className="border-2 border-yellow-600 ">Agent Email</th>
                  <th className="border-2 border-yellow-600 ">Agent Name</th>
                  <th className="border-2 border-yellow-600 ">Price Range ($)</th>
                  <th className="border-2 border-yellow-600 ">Status </th>
                  <th className="border-2 border-yellow-600 ">Verify</th>
                  <th className="border-2 border-yellow-600 ">Reject</th>
                </tr>
              </thead>
              <tbody>

                {
                  property?.map((Item) => <ManageItem
                    key={Item._id}
                    Item={Item}
                    refetch={refetch}
                    ></ManageItem>)
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

export default ManageProperties;