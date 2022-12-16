import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    login("Miguel Blanco"); //llamo la funcion en el context proporcionado como props el valor del name para setearlo en el estado mediante el reducer
    navigate(lastPath, { replace: true }); //evita que el usuario regrese a la pagina anterior (simulando un logout)
  };

  return (
    <>
      <h1>LoginPage</h1>
      <hr />

      <button onClick={onLogin} className="btn btn-primary">
        Login
      </button>
    </>
  );
};
