import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth"

export const PublicRoute = ({children}) => {

    const { logged } = useContext(AuthContext);

  return (!logged)
        ? children
        : <Navigate to='/marvel'/> //Verifica si logged está en false manda lo componentes hijos, si está en true navega a marvel nuevamente
}
