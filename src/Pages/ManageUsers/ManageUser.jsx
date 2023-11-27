import { FaBan, FaTrash } from "react-icons/fa";
import { FaPersonArrowUpFromLine, FaPersonCircleExclamation } from "react-icons/fa6";
import swal from "sweetalert";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUser = ({ Item, index }) => {
  const { _id, name, email, role, profile } = Item || {};
  const axiosSecure = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user');
      return res.data;
    }
  });

 

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
          refetch();
          swal("Okay, Done!", "Make Admin Successfully!", "success");

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
          refetch();
          swal("Okay, Done!", "Make Agent Successfully!", "success");

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

  const handleDelete = user => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/user/${_id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }

  return (
    <tr key={Item._id} className="text-xl text-slate-500 font-semibold">

      <td className="border-2 border-pink-800 font-bold text-pink-800 ">{index + 1}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{name}</td>
      <td className="border-2 border-pink-800 text-pink-800 ">{email}</td>
      <td className="border-2 border-pink-800 text-center ">
        {
          (role === "Admin"  ) ? <div className="font-bold text-blue-600">{role}</div> : <button onClick={handleAdmin} className="bg-blue-600 text-white rounded-lg p-3 font-extrabold text-2xl"> <FaPersonCircleExclamation /> </button>
        }
      </td>
      <td className="border-2 border-pink-800 text-center ">
        {
          ( role === "Agent") ? <div className="font-bold text-orange-600">{role}</div> : <button onClick={handleAgent} className="bg-orange-600 text-white rounded-lg p-3 font-extrabold text-2xl"> <FaPersonArrowUpFromLine /> </button>
        }
      </td>
      <td className="border-2 border-pink-800 text-white text-center ">
        {
          (role === "Agent") ? <button onClick={handleFraud} className="p-3 bg-red-600 rounded-lg font-extrabold text-2xl"> <FaBan />  </button>
            : <></>
        }
      </td>

       <td className="border-2 border-pink-800 text-white "><button onClick={handleDelete} className="p-3 bg-red-600 rounded-lg font-extrabold text-2xl"> <FaTrash />  </button></td>

    </tr>
  );
};

export default ManageUser;