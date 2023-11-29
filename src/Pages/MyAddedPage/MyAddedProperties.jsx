import { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FcApproval } from "react-icons/fc";
import { MdBlock } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { Helmet } from 'react-helmet';

const MyAddedProperties = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure();
    const { data: property = [], refetch } = useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await axiosSecure.get('/property');
            return res.data;
        }
    })
    const addedProperty = property?.filter((item) => item?.agent_email === user?.email);

    const handleDeleteProperty = item => {
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

                axiosSecure.delete(`/property/${item._id}`)
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
    };


    return (
        <div className="my-5">
            <Helmet>
                <title>{'HRE-hub || My Added Properties'}</title>
            </Helmet>
            <h2 className="text-3xl text-center border-y-4 p-5 rounded-xl border-blue-800 font-bold">My Properties Page</h2>
            {
                addedProperty.length !== 0 ?
                    <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl my-10 mx-auto">
                        {
                            addedProperty?.map(item => <div
                                key={item._id}
                                item={item}
                                className="flex justify-between rounded-lg gap-5 md:gap-8 shadow-lg">
                                <img className="w-[200px] rounded-l-lg h-full" src={item.property_image} alt="" />
                                <div class="border-r-8 border-black rounded-r-lg pr-2 py-3">
                                    <h3 className="text-2xl font-bold">{item.property_title}</h3>
                                    <p className="font-medium ">{item.property_location}</p>
                                    <div className="flex gap-3 my-2 items-center justify-center">
                                        <img src={item.agent_image} className="rounded-full w-10 h-10" alt="" />
                                        <p className="font-bold ">{item.agent_name}</p>

                                    </div>
                                    <p className="font-bold my-2">Price Range ($) : {item.price_range}</p>
                                    <p className="font-bold">
                                        {
                                            (item?.verification_status === "Verified") ?
                                                <div className="text-2xl text-blue-600 flex items-center gap-2 justify-center">Status: {item.verification_status} <FcApproval />  </div> : <div>
                                                </div>
                                        }
                                        {
                                            (item?.verification_status === "Rejected") ?
                                                <div className="text-2xl text-red-600 flex items-center gap-2 justify-center">Status: {item.verification_status} <MdBlock /> </div> : <div>
                                                </div>
                                        }
                                        {
                                            (item?.verification_status === "Pending") ?
                                                <div className="text-2xl text-yellow-600 flex items-center gap-2 justify-center">Status: {item.verification_status} <MdPending /> </div> : <div>
                                                </div>
                                        }

                                    </p>
                                    <div className="flex gap-3">
                                        {
                                            (item.verification_status === "Rejected") ?
                                                <div></div>
                                                :
                                                <Link to={`/dashboard/update/${item._id}`} className="">
                                                    <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Update </button>
                                                </Link>
                                        }
                                        <button onClick={() => handleDeleteProperty(item)} className="btn text-2xl font-bold btn-outline border-0 border-b-4 mt-4"> Delete </button>
                                    </div>

                                </div>

                            </div>
                            )
                        }
                    </div>
                    :
                    <div>
                        <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
                    </div>
            }
        </div>
    );
};

export default MyAddedProperties;