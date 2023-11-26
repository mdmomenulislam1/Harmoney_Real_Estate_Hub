import { FaBan, FaTrash } from "react-icons/fa";
import { FaPersonArrowUpFromLine, FaPersonCircleExclamation } from "react-icons/fa6";
import swal from "sweetalert";

const ManageUser = ({ Item, index}) => {
  const { _id, name, email, role, profile } = Item || {}
 
  const handleAdmin = () => {
    const userData = {
      role: "Admin"
    }
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
        
          swal("Okay, Done!", "Make Admin Successfully!", "success");
          refetch();
        }
      });
  };

  const handleAgent = () => {
    const userData = {
      role: "Agent"
    }
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
        
          swal("Okay, Done!", "Make Agent Successfully!", "success");
          refetch();
        }
      });
  };


  const handleFraud = () => {
    const userData = {
      role: "Fraud"
    }
    fetch(`http://localhost:5000/user/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
        
          swal("Okay, Done!", "Make Fraud Successfully!", "success");
          refetch();
        }
      });
  };

  const handleDelete = () => {
    // const userData = {
    //   role: "Admin"
    // }
    // fetch(`http://localhost:5000/user/${_id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.acknowledged) {
        
    //       swal("Okay, Done!", "Make Admin Successfully!", "success");
    //       refetch();
    //     }
    //   });
  };

  return (
    <tr key={Item._id} className="text-xl text-slate-500 font-semibold">

      <td className="border-2 border-yellow-600 ">{index+1}</td>
      <td className="border-2 border-yellow-600 ">{name}</td>
      <td className="border-2 border-yellow-600 ">{email}</td>
      <td className="border-2 border-yellow-600 ">
        {
          (role === "Admin")?<></>:<button onClick={handleAdmin} className="p-3 font-extrabold text-2xl"> <FaPersonCircleExclamation/> </button>
        }
        </td>
      <td className="border-2 border-yellow-600 ">
       {
        (role==="Agent") ? <></> :  <button onClick={handleAgent} className="p-3 font-extrabold text-2xl"> <FaPersonArrowUpFromLine/>  </button>
       }
        </td>
      <td className="border-2 border-yellow-600 ">
      {
        (role === "Agent") ? <button onClick={handleFraud} className="p-3 font-extrabold text-2xl"> <FaBan/>  </button> 
      :<></>
      }
      </td>
      
      <td className="border-2 border-yellow-600 ">{role}</td>
      <td className="border-2 border-yellow-600 "><button onClick={handleDelete} className="p-3 font-extrabold text-2xl"> <FaTrash/>  </button></td>

    </tr>
  );
};

export default ManageUser;