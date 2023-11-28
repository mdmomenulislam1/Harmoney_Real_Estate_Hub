import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { IoMdCheckmark } from 'react-icons/io';
import { FaBan, FaTrash } from 'react-icons/fa6';

const ManageUsers = () => {
  // const [userInfo] = useUsers([]);
  const axiosSecure = useAxiosSecure();
  const { data: userInfo = [], refetch } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res = await axiosSecure.get('/user');
      return res.data;
    }
  });


  const handleAdmin = item => {

    const adminData = {
      name: item.name,
      email: item.email,
      profile: item.profile,
      role: "Admin"
    }
    axiosSecure.patch(`/user/${item._id}`, adminData )
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };

  const handleAgent = item => {

    const agentData = {
      name: item.name,
      email: item.email,
      profile: item.profile,
      role: "Agent"
    };

    axiosSecure.patch(`/user/${item._id}`, agentData )
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is an Agent Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };

  const handleFraud = item => {

    const fraudData = {
      name: item.name,
      email: item.email,
      profile: item.profile,
      role: "Admin"
    }
    axiosSecure.patch(`/user/${item._id}`, fraudData )
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} is a Fraud!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  };

  const handleDelete = item => {
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
  
            axiosSecure.delete(`/user/${item._id}`)
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
    <div className="my-5">
      <h2 className="text-3xl  text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">Manage Users Page</h2>
     {
        userInfo?.length !== 0 ?
          <div className="overflow-x-auto rounded-2xl my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-pink-800">

                  <th className="border-2 border-pink-800 text-pink-800 ">SL.</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Name</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Email</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Make Admin</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Make Agent</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Make Fraud</th>
                  <th className="border-2 border-pink-800 text-pink-800 ">Delete</th>
                </tr>
              </thead>
              <tbody>

                {
                  userInfo?.map((item, index) => <tr key={item._id} className="text-xl text-slate-500 font-semibold">

                  <td className="border-2 border-pink-800 font-bold text-pink-800 ">{index + 1}</td>
                  <td className="border-2 border-pink-800 text-pink-800 ">{item.name}</td>
                  <td className="border-2 border-pink-800 text-pink-800 ">{item.email}</td>
                  <td className="border-2 border-pink-800 text-center ">
                    {
                      (item.role === "Admin"  ) ? <div className="font-bold text-blue-600">{item.role}</div> : <button onClick={() => handleAdmin(item)} className="bg-blue-600 text-white rounded-lg p-3 font-extrabold text-2xl"> <IoMdCheckmark /> </button>
                    }
                  </td>
                  <td className="border-2 border-pink-800 text-center ">
                    {
                      ( item.role === "Agent") ? <div className="font-bold text-orange-600">{item.role}</div> : <button onClick={() => handleAgent(item)} className="bg-orange-600 text-white rounded-lg p-3 font-extrabold text-2xl"> <IoMdCheckmark /> </button>
                    }
                  </td>
                  <td className="border-2 border-pink-800 text-white text-center ">
                    {
                      (item.role === "Agent") ? <button onClick={() => handleFraud(item)} className="p-3 bg-red-600 rounded-lg font-extrabold text-2xl"> <FaBan />  </button>
                        : <></>
                    }
                  </td>
            
                   <td className="border-2 border-pink-800 text-white "><button onClick={() => handleDelete(item)} className="p-3 bg-red-600 rounded-lg font-extrabold text-2xl"> <FaTrash />  </button></td>
            
                </tr>)
                }
              </tbody>
            </table>
          </div>
          :
          <div>
            <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
          </div>
      }
    
    </div>
  );
};

export default ManageUsers;