

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";

const useReview = () => {
  
    const axiosSecure = useAxiosSecure();
   

    const { data: review = [], isPending: loading, refetch } = useQuery({
      queryKey: ['review'],
      queryFn: async () => {
        const res = await axiosSecure.get('/review');
        return res.data;
      }
    })


    return [review, loading, refetch]
  };

  export default useReview;