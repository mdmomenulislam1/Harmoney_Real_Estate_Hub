import React, { useContext } from 'react';
import useWishlist from '../../Hooks/useWishlist';
import WishedItem from './WishedItem';
import { AuthContext } from '../../Firebase/AuthProvider';

const Wishlist = () => {
  const {user} = useContext(AuthContext);
  const [wishedProperty] = useWishlist();
  console.log(wishedProperty);
  const wished = wishedProperty?.filter((item) => item?.buyer_email === user?.email);


  
  return (
      <div className="mx-10 my-10">
         
          <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
              {
                   wished?.map(item => <WishedItem
                      key={item._id}
                      item={item}
                  ></WishedItem>)
              }
          </div>
          {/* <Link to={"/allProperties"} className="grid justify-center">
            
            <button className="btn btn-outline border-0 border-b-4 mt-4">View All Properties</button>
         
          
          </Link> */}
          
      </div>
  );
};

export default Wishlist;