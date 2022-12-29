import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), //nos traemos todas las funcionalidades de react dom para que no mande error por no ser usadas
  useNavigate: () => mockedUseNavigate,
})); //creamos el muck del usenavigate usado en el componente

describe("Pruebas en <SearchPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrarse correactamente con valores por defecto", () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot(); //Se espera que el componente no esté modificado
  });
  test("debe mostrar a batman y el input con el valor del querysting", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <SearchPage />
      </MemoryRouter>
    );
    const inputValue = screen.getAllByRole("textbox");
    expect(inputValue).toBe("batman"); //se espera que valor en el input sea el mismo que se pasa por parámetro en la ruta mediante el initialEntries

    const img = screen.getByRole("img");
    expect(img).toContain("assets/heroes/dc-batman.jpg"); //se espera que la imagen del heroe especificado se esté mostrando con la url especificada

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe("none"); //se espera que el componente esté mostrando el div con el aria label especificado con estilo display none
    // screen.debug();
  });
  test("debe mostrar un error si no se encuentra el heroe (batman123)", () => {
    render(
      <MemoryRouter initialEntries={["/search?q=batman123"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const alert = screen.getByLabelText("alert-danger");
    expect(alert.style.display).toBe(""); //se espera que no se muestre la alerta cuando se intenta buscar un heroe
    // screen.debug();
  });
  test("debe llamar el navigate a la pantalla nueva", () => {
    const inputValue = "superman";

    render(
      <MemoryRouter initialEntries={["/search3"]}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { name: "searchText", value: inputValue },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q-${inputValue}`); //se espera que la pagina navegue a la ruta especificada en el input del form luego del evento
  });
});
