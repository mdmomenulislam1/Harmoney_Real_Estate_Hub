// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";


// const AddedItem = ({ item }) => {
//   const axiosSecure = useAxiosPublic();
//   const { data: property = [], refetch } = useQuery({
//     queryKey: ['Property'],
//     queryFn: async () => {
//         const res = await axiosSecure.get('/property');
//         return res.data;
//     }
// })
  
//   const { _id, property_image, property_title, agent_name, agent_image, property_location, price_range, verification_status } = item;

//   const handleDeleteProperty = item => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {

//         axiosSecure.delete(`/property/${_id}`)
//           .then(res => {
//             if (res.data.deletedCount > 0) {
//               refetch();
//               Swal.fire({
//                 title: "Deleted!",
//                 text: "Your file has been deleted.",
//                 icon: "success"
//               });
//             }
//           })
//       }
//     });
//   }

//   return (
//     <div className="flex justify-between rounded-lg gap-5 md:gap-8 shadow-lg">
//       <img className="w-[200px] rounded-l-lg h-full" src={property_image} alt="" />
//       <div class="border-r-8 border-black rounded-r-lg pr-2 py-3">
//         <h3 className="text-2xl font-bold">{property_title}</h3>
//         <p className="font-medium ">{property_location}</p>
//         <div className="flex gap-3 my-2 items-center">
//           <img src={agent_image} className="rounded-full w-10 h-10" alt="" />
//           <p className="font-bold ">{agent_name}</p>

//         </div>
//         <p className="font-bold my-2">Price Range: {price_range}</p>
//         <p className="font-medium">{verification_status}</p>
//         <div className="flex gap-3">
//           {
//             (verification_status === "rejected") ?
//               <></>
//               :
//               <Link to={`/dashboard/update/${_id}`} className="">
//                 <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Update </button>
//               </Link>
//           }
//           <button onClick={() => handleDeleteProperty(item)} className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Delete </button>


//         </div>

//       </div>

//     </div>
//   );
// };

// export default AddedItem;