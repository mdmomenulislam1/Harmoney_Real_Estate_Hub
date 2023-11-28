import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useGeneral = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isGeneral, isPending: isGeneralLoading } = useQuery({
        queryKey: [user?.email, 'isGeneral'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/general/${user.email}`);
            return res.data?.general;
        }
    })
    return [isGeneral, isGeneralLoading]
};

export default useGeneral;