import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  
    const axiosPublic = useAxiosPublic();
   
    const { data: userInfo = [], isPending: loading, refetch } = useQuery({
      queryKey: ['userInfo'],
      queryFn: async () => {
        const res = await axiosPublic.get('/user');
        return res.data;
      }
    })

    return [userInfo, loading, refetch]
  };

  export default useUsers;