import React, { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import useOffered from '../../Hooks/useOffered';
import BoughtItem from './BoughtItem';

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const [offered, refetch] = useOffered();
  const offeredData = offered?.filter((item) => item?.buyerEmail === user?.email);

  return (
    <div>
      <h2 className="text-2xl">Property Bought Page</h2>
      <div className="grid md:grid-cols-2 gap-5">
      {
        offeredData?.map(item => <BoughtItem
          key={item._id}
          item={item}
        ></BoughtItem>)
      }
      </div>
    </div>
  );
};

export default PropertyBought;