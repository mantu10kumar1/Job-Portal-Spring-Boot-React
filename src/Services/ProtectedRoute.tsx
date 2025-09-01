import { all } from "axios";
import { jwtDecode } from "jwt-decode";
import { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface ProtedtedRouteProps{
    children:JSX.Element;
    allowedRoles?: string[];

 }

const ProtectedRoute: React.FC<ProtedtedRouteProps> = ({children, allowedRoles}) => {

    const token = useSelector((state:any) =>state.jwt);
    if(!token){
        return <Navigate to="/login"/>;
    }
    const decoded:any = jwtDecode(token);
    console.log("Token decoded data in ProtectedRoute : " , decoded);
    if(allowedRoles && !allowedRoles.includes(decoded.accountType)) 
        return <Navigate to="/unauthorized"/>;

    return children;
}

export default ProtectedRoute;