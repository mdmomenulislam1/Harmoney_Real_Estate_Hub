import { FaXmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import swal from "sweetalert";

const ManageItem = ({ Item, index }) => {
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
    <tr key={Item._id} className="text-xl text-slate-600 font-semibold">

      <td className="border-2 border-pink-800 text-pink-800 ">{index + 1}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{property_title}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{property_location}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{agent_email}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{agent_name}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{price_range}</td>
      
      <td className="border-2 border-pink-800 text-pink-800 ">
        {(verification_status !== "Pending") ?<span className="font-bold text-blue-600">{verification_status}</span>: 
        
        <>
        <div className="font-bold text-red-600">
        {verification_status}
        </div>
        
        <div className="text-center flex gap-2">
        <button onClick={handleVerify} className="rounded-lg bg-blue-600 text-white font-bold p-2 text-2xl"> <IoMdCheckmark />  </button>
        <button onClick={handleReject} className="rounded-lg bg-red-600 p-2 text-white font-extrabold text-2xl"><FaXmark /> </button>
        </div> </>

}
      </td>
      

    </tr>
  );
};

export default ManageItem;