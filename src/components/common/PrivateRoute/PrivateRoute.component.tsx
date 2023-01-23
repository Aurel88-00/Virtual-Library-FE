import { FunctionComponent } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from 'react-router-dom'


interface PrivateRouteProps {
    children?: any;
    element: any;
}


export const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ element }) => {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? element : <Navigate to="/auth/login" />
}


