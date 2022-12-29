import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), //nos traemos todas las funcionalidades de react dom para que no mande error por no ser usadas
    useNavigate: () => mockedUseNavigate,
})); //creamos el muck del usenavigate usado en el componente

describe("Pruebas en el componente <Navbar />", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Miguel Angel",
    },
    logout: jest.fn(), //mock de la función logout
  };

  beforeEach(() => jest.clearAllMocks()); //Para limpiar el mocks cada vez que hagamos un nuevo test
  test("debe mostrar el nombre del usuario usuario", () => {
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Miguel Angel")).toBeTruthy(); //se espera que usuario que mandamos en el contexto sea mostrado en el componente
    // screen.debug();
  });
  test("debe llamar el logout y navigate cuando se hace click en el botón", () => {
    render(
      <MemoryRouter initialEntries={["/marvel"]}>
        <AuthContext.Provider value={contextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled(); //se espera que al darle click en el botón la funcion que viene del context sea llamada
    expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true}); //Se espera que la función useNavigate sea llamada mediante el muck con los parametros establecidos en la ruta
    // screen.debug();
  });
});
