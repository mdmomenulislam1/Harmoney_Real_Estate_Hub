import { useContext } from "react";
import  { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAgent from "../Hooks/useAgent";

const AgentRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAgent, isAgentLoading] = useAgent();
    const location = useLocation();

    if (loading || isAgentLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAgent) {
        return children;
    }

    return <Navigate state={location.pathname} to="/" replace ></Navigate>;

};

export default AgentRoute;