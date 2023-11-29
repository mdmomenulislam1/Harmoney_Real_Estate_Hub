import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Firebase/AuthProvider";
import useAxiosSecure from "./UseAxiosSecure";

const useAgent = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAgent, isPending: isAgentLoading } = useQuery({
        queryKey: [user?.email, 'isAgent'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/agent/${user.email}`);
            return res.data?.agent;
        }
    })
    return [isAgent, isAgentLoading]
};

export default useAgent;