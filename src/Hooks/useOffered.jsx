import useAxiosPublic from "./useAxiousPublic";
import { useQuery } from "@tanstack/react-query";

const useOffered = () => {
  
    const axiosPublic = useAxiosPublic();
   

    const { data: offered = [], isPending: loading, refetch } = useQuery({
      queryKey: ['offered'],
      queryFn: async () => {
        const res = await axiosPublic.get('/offeredProperty');
        return res.data;
      }
    })


    return [offered, loading, refetch]
  };

  export default useOffered;