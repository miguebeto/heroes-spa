import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { HeroesRoutes } from "../heroes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path="login" element={<LoginPage />} /> */}
        <Route path="login" element={
          <PublicRoute>
            {/* <LoginPage />  Debe pasarse el componente y no la ruta porque route siempre debe estar debado de routes */}
            <Routes>
              <Route path="/*" element={<LoginPage />} /> {/* Tambien se puede hacer de esta forma y funciona cambiando el path pór un comodin "/*" */} 
            </Routes>
          </PublicRoute>
        } />
        <Route path="/*" element={
          <PrivateRoute>
            <HeroesRoutes /> {/* Debe pasarse el componente y no la ruta porque route siempre debe estar debado de routes */}
          </PrivateRoute>
        } /> {/* Creación de rutas privadas mediante un router de alto nivel con children */}
        {/* <Route path="/*" element={<HeroesRoutes />} />  Manda cualquier otra ruta que no sea raiz "/" al otro router con las demás rutas */}
      </Routes>
    </>
  );
};
