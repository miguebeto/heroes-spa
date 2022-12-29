import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";

describe("Pruebas en <PublicRoute />", () => {
  test("debe mostrar el children si no está autenticado", () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Rutas públicas</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Rutas públicas")).toBeTruthy(); // se espera que muestro los componentes hijos en caso de que el logged recibido por el context sea false
    // screen.debug();
  });
  test("debe navegar si está autenticado ", () => {
    const contextValue = {
      logged: true,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="login"
              element={
                <PublicRoute>
                  <h1>Rutas públicas</h1>
                </PublicRoute>
              }
            />
            <Route path="marvel" element={<h1>Pagina de marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Pagina de marvel')).toBeTruthy(); //Se espera que estando en la ruta /login  y luego de asignar una ruta pública, una normal y pasarle por contexto el logged en true, muestre las ruta correspondiente al path de 'marvel'
  });
});
