import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../components";
import { getHeroByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate(); //para obtener la navegación
  const location = useLocation(); //obtiene la localización donde nos encontramos en el html

  const { q = "" } = queryString.parse(location.search); //queryString para dividir la informacion que se pasa por parametro en la ruta, extrayendo lo que viene despues de q= (siempre son string)
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0 );
  const showError = (q.length > 0 ) && heroes.length === 0;

  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
          </form>
          <button
            onClick={onSearchSubmit}
            className="btn btn-outline-primary mt-2"
          >
            Search
          </button>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* {
            (q === '')
              ? <div className="alert alert-primary">Search a hero</div>
              : (heroes.length === 0) && <div className="alert alert-danger">No hero With <b>{q}</b></div>
          } */}
          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Search a hero
          </div>
          <div className="alert alert-danger animate__animated animate__fadeIn" style={{ display: showError ? "" : "none" }}>
            No hero With <b>{q}</b>
          </div>
          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
