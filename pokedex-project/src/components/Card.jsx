import {  Link  } from 'react-router-dom';

export function Card({item}){
    if (!item) return null;

    const id = item.url && item.url.split(`/`).length > 6 ? item.url.split(`/`)[6] : null;

    if (!id) return null;

    const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
        <Link to={`/item/${item.name}`} className="card">
            <img src={IMG_URL} alt={ `Imagen de ${item.name}` } />
            <p>{item.name}</p>
        </Link>
    )
}