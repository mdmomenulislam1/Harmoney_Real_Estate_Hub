import { Link } from "react-router-dom";


const PropertyItem = ({ item }) => {
  const { _id, property_image, property_title, property_location, price_range, verification_status } = item || {};
  return (
    <div className="flex justify-between rounded-lg gap-5 md:gap-8 shadow-lg">
      <img className="w-[300px] rounded-l-lg h-full" src={property_image} alt="" />
      <div class="border-r-8 border-black rounded-r-lg pr-2 py-3">
        <h3 className="text-2xl font-bold">{property_title}</h3>
        <p className="font-medium ">{property_location}</p>
        <p className="font-bold my-2">Price Range: {price_range}</p>
        <p className="font-medium">{verification_status}</p>
        <Link to={`/allProperties/${_id}`}>
          <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Details </button>
        </Link>
      </div>

    </div>
  );
};

export default PropertyItem;