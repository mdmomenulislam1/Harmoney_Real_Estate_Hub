import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useGeneral from "../Hooks/useGeneral";
import { useLocation } from "react-router-dom";

const GeneralRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isGeneral, isGeneralLoading] = useGeneral();
    const location = useLocation();

    if (loading || isGeneralLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isGeneral) {
        return children;
    }

    return <Navigate state={location.pathname} to="/" replace ></Navigate>;

};

export default GeneralRoute;