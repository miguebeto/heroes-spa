import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe("Pruebas en el componente <PrivateRoute />", () => {
  test("debe mostrar el children si está autenticado ", () => {
    
    Storage.prototype.setItem = jest.fn(); //sobreescribimos el prototype de local storage para poderlo testear

    const contextValue = {
      logged: true,
      user: {
        id: "abc",
        name: "Miguel Angel",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta privada")).toBeTruthy(); // se espera que muestre los componentes hijos en caso de que el logged recibido por el context sea true
    expect(localStorage.setItem).toBeCalledWith("lastPath", "/marvel"); //Se espera que el local storage sea llamado con el lastpast y el path donde nos encontramos especificado en initialEntries
    // screen.debug();
  });
});
