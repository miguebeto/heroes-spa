import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers/getHeroById";

export const HeroPage = () => {
  const { heroid } = useParams(); //usamos la variable creada en la ruta del router que contiene el valor del id de cada heroe donde ingresamos "dc-batman, dc-superman"
  const navigate = useNavigate(); //metodo para cambiar de lugar en la navegacion

  const hero = useMemo(() => getHeroById(heroid), [heroid]); //usememo para memorizar valores cada vez que la dependencia cambie, usecallback para memorizar funciones

  const onNavigateBack = () => {
    return navigate(-1); // Le indicamos a donde debe navegar a la pagina anterior con el -1
  };

  if (!hero) return <Navigate to="/marvel" />;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          className="img-thumbnail border border-dark border-5 animate__animated animate__fadeInLeft"
          src={`/heroes/${heroid}.jpg`}
          alt={hero.superhero}
        />
      </div>
      <div className="col-8">
        <h3>{hero.superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance: </b>
            {hero.first_appearance}
          </li>
        </ul>
        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>
        <button onClick={onNavigateBack} className="btn btn-outline-primary">
          Back
        </button>
      </div>
    </div>
  );
};
