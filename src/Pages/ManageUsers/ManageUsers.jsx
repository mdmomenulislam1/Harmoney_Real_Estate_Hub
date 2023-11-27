import useUsers from '../../Hooks/useUsers';
import ManageUser from './ManageUser';

const ManageUsers = () => {
  const [userInfo] = useUsers([]);
  
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
                  userInfo?.map((Item, index) => <ManageUser
                    key={Item._id}
                    Item={Item}
                    index={index}
                    >

                      
                    </ManageUser>)
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