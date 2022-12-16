import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";

import { types } from "../types/types";

// const initialState = {
//   logged: false,
// };

const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return {
    logged: !!user, //manda true si hay usuario guardado en localStorage de lo contrario manda false
    user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init); //creamos el estado global mediante un reducer importando el reducer y creando el estado inicial

  const login = (name = "") => {
    const user = { id: "ABC", name };
    const action = { type: types.login, payload: user };

    localStorage.setItem("user", JSON.stringify(user));
    dispatch(action);
  };

  const logout = () => {
    localStorage.removeItem('user');
    const action = {type: types.logout};
    dispatch(action);
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,

        //methods
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; //provee la informacion del value a todos los componentes hijos mediante el children como componente de alto nivel
