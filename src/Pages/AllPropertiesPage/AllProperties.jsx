import useProperty from '../../Hooks/useProperties';
import PropertyItem from './PropertyItem';

const AllProperties = () => {
  const [property] = useProperty();
  
  return (
      <div className="mx-10 my-10">
         
          <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
              {
                  property?.map(item => <PropertyItem
                      key={item._id}
                      item={item}
                  ></PropertyItem>)
              }
          </div>
          
          
      </div>
  );
};

export default AllProperties;