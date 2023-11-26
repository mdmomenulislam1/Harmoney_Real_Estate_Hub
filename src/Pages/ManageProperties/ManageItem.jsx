import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import swal from "sweetalert";

const ManageItem = ({ Item}, refetch) => {
  const { _id, property_title, property_image, property_description, property_location, agent_email, verification_status, price_range, agent_name, agent_image } = Item || {}
 
  const handleVerify = () => {
    const propertyData = {
      property_title,
      property_image,
      property_location,
      agent_name,
      agent_email,
      agent_image,
      price_range,
      verification_status: "Verified",
      property_description
    }

    fetch(`http://localhost:5000/property/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
        
          swal("Okay, Done!", "Request Verified!", "success");
          refetch();
        }
      });
  };

  const handleReject = () => {
    const propertyData = {
      property_title,
      property_image,
      property_location,
      agent_name,
      agent_email,
      agent_image,
      price_range,
      verification_status: "Rejected",
      property_description
    }

    fetch(`http://localhost:5000/property/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propertyData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          swal("Okay, Done!", "Request Rejected!", "success");
        }
      });
  }

  return (
    <tr key={Item._id} className="text-xl text-slate-500 font-semibold">

      <td className="border-2 border-yellow-600 ">{property_title}</td>
      <td className="border-2 border-yellow-600 ">{property_location}</td>
      <td className="border-2 border-yellow-600 ">{agent_email}</td>
      <td className="border-2 border-yellow-600 ">{agent_name}</td>
      <td className="border-2 border-yellow-600 ">{price_range}</td>
      <td className="border-2 border-yellow-600 ">{verification_status}</td>
      <td className="border-2 border-yellow-600 "><button onClick={handleVerify} className="p-3 font-extrabold text-2xl"> <IoMdCheckmark />  </button></td>
      <td className="border-2 border-yellow-600 "><button onClick={handleReject} className="p-3 font-extrabold text-2xl"><FaXmark /> </button></td>

    </tr>
  );
};

export default ManageItem;