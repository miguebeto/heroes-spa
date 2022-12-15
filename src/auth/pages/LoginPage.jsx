import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/", { replace: true }); //evita que el usuario regrese a la pagina anterior (simulando un logout)
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
