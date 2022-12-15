import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
  
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]); //usememo para memorizar valores cada vez que la dependencia cambie, usecallback para memorizar funciones
  
  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero} /> //forma de mandar todas las propiedades directamente en la props
      ))}
    </div>
  );
};
