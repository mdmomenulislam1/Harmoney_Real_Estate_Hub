import { useContext } from 'react';
import useProperty from '../../Hooks/useProperties';
import { AuthContext } from '../../Firebase/AuthProvider';
import AddedItem from './AddedItem';

const MyAddedProperties = () => {
  const {user} = useContext(AuthContext);
  const [property] = useProperty();
  const addedProperty = property?.filter((item) => item?.agent_email === user?.email);

  
  return (
      <div className="mx-10 my-10">
         
          <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
              {
                  addedProperty?.map(item => <AddedItem
                      key={item._id}
                      item={item}
                  ></AddedItem>)
              }
          </div>
          
          
      </div>
  );
};

export default MyAddedProperties;