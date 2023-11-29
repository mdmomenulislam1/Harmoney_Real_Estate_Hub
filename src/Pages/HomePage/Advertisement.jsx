import { Link } from "react-router-dom";
import PropertyItem from "../../SharedElement/PropertyItem";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Advertisement = () => {
    const axiosSecure = useAxiosSecure();
    const { data: advertise = [], refetch } = useQuery({
        queryKey: ['advertise'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertiseProperty');
            return res.data;
        }
    });

    const propertyData = advertise.filter((item) => item?.advertise_status === "Advertised")

    return (
        <div className="mx-10 my-10">

            {
                propertyData.length !== 0 ?
                    <div className="grid md:grid-cols-2 gap-10 max-w-screen-xl mx-auto">
                        {
                            propertyData.slice(0, 4)?.map(item => <PropertyItem
                                key={item._id}
                                item={item}
                            ></PropertyItem>)
                        }
                    </div>
                    :
                    <div>
                        <img className="rounded-xl h-full w-full" src="https://i.ibb.co/G2kW8nQ/image.png" alt="" />
                    </div>
            }
            <Link to={"/allProperties"} className="grid justify-center">

                <button className="btn text-2xl font-bold btn-outline border-0 border-b-4 my-3 md:my-6 lg:my-8">View All Properties</button>

            </Link>

        </div>
    );
};

export default Advertisement;