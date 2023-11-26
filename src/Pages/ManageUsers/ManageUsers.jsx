import useUsers from '../../Hooks/useUsers';
import ManageUser from './ManageUser';

const ManageUsers = () => {
  const [userInfo] = useUsers([]);
  


  return (
    <div>
      <h2 className="text-2xl">Manage Users</h2>
      {
        userInfo?.length !== 0 ?
          <div className="overflow-x-auto my-5 md:my-10 lg:my-15">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className="font-bold text-2xl text-yellow-600">

                  <th className="border-2 border-yellow-600 ">Name</th>
                  <th className="border-2 border-yellow-600 ">Email</th>
                  <th className="border-2 border-yellow-600 ">Make Admin</th>
                  <th className="border-2 border-yellow-600 ">Make Agent</th>
                  <th className="border-2 border-yellow-600 ">Make Fraud</th>
                  <th className="border-2 border-yellow-600 ">Role</th>
                  <th className="border-2 border-yellow-600 ">Delete</th>
                </tr>
              </thead>
              <tbody>

                {
                  userInfo?.map((Item) => <ManageUser
                    key={Item._id}
                    Item={Item}
                    ></ManageUser>)
                }
              </tbody>
            </table>
          </div>
          :
          <h2>
            No Data Found
          </h2>
      }
    
    </div>
  );
};

export default ManageUsers;