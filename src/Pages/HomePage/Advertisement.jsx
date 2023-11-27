import { Link } from "react-router-dom";
import useProperty from "../../Hooks/useProperties";
import PropertyItem from "../../SharedElement/PropertyItem";


const Advertisement = () => {
    const [property] = useProperty();
    const propertyData = property.filter((item)=> item?.verification_status === "Verified")
    
    return (
        <div className="mx-10 my-10">
           
            <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
                {
                    propertyData.slice(0, 4)?.map(item => <PropertyItem
                        key={item._id}
                        item={item}
                    ></PropertyItem>)
                }
            </div>
            <Link to={"/allProperties"} className="grid justify-center">
              
              <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 my-3 md:my-6 lg:my-8">View All Properties</button>
           
            
            </Link>
            
        </div>
    );
};

export default Advertisement;