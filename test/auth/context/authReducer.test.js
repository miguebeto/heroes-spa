import { types, authReducer } from "../../../src/auth";

describe("Pruebas en authReducer.js", () => {
  test("debe retornar el estado por defecto", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false }); //se espera que retorne el mismo initialState pasado debido ya que no coincide con ningún action.type
  });
  test("debe de (login) llamar el login autenticar y establecer el user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Miguel",
        id: "123",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    }); //se espera que al pasarle el action.type login el logged a true y set el nuevo usuario pasado mediante el payload
  });
  test("debe de (loggout) borrar el name del usuario y logged en false", () => {
    const state = {
      logged: true,
      user: { id: "123", name: "Miguel" },
    };
    const action = {
      type: types.logout,
    };
    const newState = authReducer(state, action);
    expect(newState).toEqual({ logged: false });//se espera que elimine el usuario ingresado y devuelva el el estado con el logged en false
  });
});
