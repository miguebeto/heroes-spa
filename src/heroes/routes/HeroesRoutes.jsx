import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui";
import { DcPage, HeroPage, MarvelPage, SearchPage } from "../pages";

export const HeroesRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>{/* Enrutador que contiene las rutas de nuestra pagina */}
            <Route path="marvel" element={<MarvelPage />} />{/* Rutas establecidas */}
            <Route path="dc" element={<DcPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="hero/:heroid" element={<HeroPage />} /> {/* Crea una variable con el valor de lo que venga en la ruta, en este caso el id de heroe */}

            {/* Search, Hero by id */}
            <Route path="/" element={<Navigate to="marvel" />} /> {/* Ruta por defecto cuando en el / o ruta inicial  */}
        </Routes>
      </div>
    </>
  );
};
 