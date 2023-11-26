import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useWishlist = () => {
  
    const axiosPublic = useAxiosPublic();
   

    const { data: wishedProperty = [], isPending: loading, refetch } = useQuery({
      queryKey: ['wishedProperty'],
      queryFn: async () => {
        const res = await axiosPublic.get('/wishedProperty');
        return res.data;
      }
    })


    return [wishedProperty, loading, refetch]
  };

  export default useWishlist;