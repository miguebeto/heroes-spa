import { types } from "../../../src/auth";

describe('Pruebas en "types.js', () => {
  test("debe regresar estos types", () => {
    expect(types).toEqual({ login: "[Auth] Login", logout: "[Auth] Logout" }); //Se espera que los tipos mandandos al reducer sean los correctos
  });
});
