import useAxiosPublic from "./useAxiousPublic";
import { useQuery } from "@tanstack/react-query";

const useReview = () => {
  
    const axiosPublic = useAxiosPublic();
   

    const { data: review = [], isPending: loading, refetch } = useQuery({
      queryKey: ['review'],
      queryFn: async () => {
        const res = await axiosPublic.get('/review');
        return res.data;
      }
    })


    return [review, loading, refetch]
  };

  export default useReview;