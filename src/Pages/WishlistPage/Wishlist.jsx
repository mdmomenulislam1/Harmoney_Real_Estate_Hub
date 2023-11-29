import React, { useContext } from 'react';
import useWishlist from '../../Hooks/useWishlist';
import WishedItem from './WishedItem';
import { AuthContext } from '../../Firebase/AuthProvider';
import { Helmet } from 'react-helmet';

const Wishlist = () => {
  const {user} = useContext(AuthContext);
  const [wishedProperty, refetch] = useWishlist();
  const wished = wishedProperty?.filter((item) => item?.buyer_email === user?.email);


  
  return (
      <div className="my-5">
        <Helmet>
        <title>{'HRE-hub || Wishlist'}</title>
      </Helmet>
        <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Wishlist Page</h2>
     
          {
            wished.length !== 0 ?
            <div className="grid md:grid-cols-2 lg:grid-cols-3 my-5 gap-4 md:gap-8 lg:gap-10 mx-auto">
              {
                   wished?.map(item => <WishedItem
                      key={item._id}
                      item={item}
                      refetch={refetch}
                  ></WishedItem>)
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

export default Wishlist;