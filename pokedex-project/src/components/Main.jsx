import { Card } from "./Card";

export function Main({listPokemon, pokeSearch}){

    return(
      <>
        <div className="list container">
            { listPokemon && listPokemon.length > 0 ? (
                 listPokemon.map((item, index) => (
                    <Card  key={index} item={item} />
                  ))
            ):(
              <p>No hay resultados para "{pokeSearch}"</p>
            )}
        </div>
      </>
    );
}