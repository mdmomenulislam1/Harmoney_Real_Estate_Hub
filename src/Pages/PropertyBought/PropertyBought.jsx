import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useOffered from '../../Hooks/useOffered';
import BoughtItem from './BoughtItem';
import { Helmet } from 'react-helmet';

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const [offered, refetch] = useOffered();
  const offeredData = offered?.filter((item) => item?.buyerEmail === user?.email);

  return (
    <div className="my-5">
      <Helmet>
        <title>{'HRE-hub || Bought Page'}</title>
      </Helmet>
      <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Property Bought Page</h2>

      {
        offeredData.length !== 0 ?
          <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-4 md:gap-8 lg:gap-10 mx-auto">
            {
              offeredData?.map(item => <BoughtItem
                key={item._id}
                item={item}
              ></BoughtItem>)
            }
          </div>
          :
          <div>
            <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
          </div>
      }
    </div>
  );
};

export default PropertyBought;