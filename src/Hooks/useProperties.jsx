import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useProperty = (asc, search) => {
  const axiosPublic = useAxiosPublic();

  const { data: property = [], isPending: loading, refetch } = useQuery({
    queryKey: ['property', asc, search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/property?sort=${asc ? 'asc' : 'desc'}&search=${search}`);
      return res.data;
    }
  });

  return [property, loading, refetch];
};

export default useProperty;