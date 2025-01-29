import {  useEffect, useState  } from 'react';
import {  useParams  } from 'react-router-dom';

export function Item(){
    const { name } = useParams();

    const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const [pokemon, setPokemon] = useState(null);

    useEffect(() =>{
        const dataPokemon = async () =>{
            const response = await fetch(API_URL);
            const data = await response.json();

            setPokemon(data);
        };

        dataPokemon();
    }, []);

    return (
        <>
        {pokemon &&
        <>
            <div className="item container">
                <section className="img">
                    <img className="poke-img" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}/>
                </section>
                <div className="info">                        
                    <h2 className="name" >{pokemon.name}</h2>
                    <small>#0{pokemon.id}</small>
                    <div className="phis-info">
                        <p className="text" ><span>Peso:</span> {pokemon.weight} kg</p>
                        <p className="text" ><span>Altura:</span> {pokemon.height / 10} m</p>
                    </div>
                    <h2>TIPO</h2>
                    <div className="type">
                        {
                            pokemon.types.map((type, index) =>(
                                <p key={type.type.name + index} className="text" >{type.type.name}</p>
                            ))
                        }
                    </div>                    
                    <h2>ESTADÍSTICAS</h2>
                    <div className="table">
                        {
                            pokemon.stats.map((stat, index) =>(
                                <div className="stat-info">
                                    <p key={stat.stat.name + index} className="text" >{stat.stat.name}</p>
                                    <span key={"0" + stat.stat.name + index} className="text" >{stat.base_stat}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="last-info">
                        <h2>HABILIDADES</h2>
                    </div>
                    <div className="abilities">
                        {
                            pokemon.abilities.map((ability, index) =>(
                                <div className="ability-info">
                                    <p key={ability.ability.name + index} className="desc" >{ability.ability.name}</p>
                                </div>
                            ))
                        }
                    </div>                    
                </div>
                <section className="sprites">
                    <h2 className="bckg">SPRITES</h2>
                    <h2>VERSION SHINY</h2>
                    <img className="poke-sprite" src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                    <h2>VERSION NORMAL</h2>
                    <img className="poke-sprite" src={pokemon.sprites.front_default} alt={pokemon.name} />
                </section>
                <div /*space*/></div>
            </div>

            <section className="extra">
                <h2 className="extra-text">EXTRA-INFO</h2>
                <div className="extra-img">
                    <img className="gif" src={pokemon.sprites.other.showdown.front_default} alt={pokemon.name} />
                </div>
                <div className="move-list">
                    <h2>MOVIMIENTOS</h2>
                    <div className="moves-table">
                        {
                            pokemon.moves.map((move, index)=>(
                                <div className="moves">
                                    <span key={move.move.name + index} className="desc" >{move.move.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>    
            </section>
        </>
        }
        </>        
    )
}