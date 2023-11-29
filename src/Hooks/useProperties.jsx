import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProperty = () => {

  const axiosPublic = useAxiosPublic();

  const { data: property = [], isPending: loading, refetch } = useQuery({
    queryKey: ['property'],
    queryFn: async () => {
      const res = await axiosPublic.get('/property');
      return res.data;
    }
  })

  return [property, loading, refetch]
};

export default useProperty;