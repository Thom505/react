import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Main} from './components/Main'
import { Item } from './components/Item'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { FaHome } from "react-icons/fa"

function App() {

  const limit = 40;
  const [offset, setOffset] = useState(0);
  const [listPokemon, setListPokemon] = useState([]);
  const [pokeSearch, setPokeSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  const changeSearch = (value) => {
    setPokeSearch(value);
    if(value){
      navigate(`/item/${value.toLowerCase()}`);
    }
  }

  useEffect(()=>{
    if (pokeSearch === '') return;

    const fetchPokemons = async () => {
      try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSearch.toLowerCase()}`);
        const data = await response.json();
  
        setListPokemon([data]);
      }catch(error){
        alert("No se hallaron resultados:" + error)
      }
    };

    fetchPokemons();
  },[pokeSearch]);

  useEffect(() =>{
    if (location.pathname === '/'){
      const fetchData = async () => {
        try{
          const response = await fetch(API_URL);
          const data = await response.json();
  
          setListPokemon(data.results);
        }catch (error){
          console.log(error);
        }
       };   
       fetchData();
    } 
  }, [location.pathname, offset]);

  return (
    <>
      <Header pokeSearch={pokeSearch} changeSearch={changeSearch} />
      <section className="home">
        <Link className="home-element"  to="/" ><FaHome />Volver a la Pokedex</Link>
      </section>
      <Routes>
        <Route index path="/" element={<Main listPokemon={listPokemon} pokeSearch={pokeSearch} />} ></Route>
        <Route path="/item/:name" element={ <Item /> } ></Route>
      </Routes>

      {location.pathname === '/' && (
        <div className="pagination">
        {
          Array(10).fill().map((_, index) =>(
            <a key={index} className="number-page" onClick={() => setOffset(limit * index)}>{(index + 1)}</a>
          ))
        }
        </div>
      )}

      <Footer/>
    </>
  );
}

export default App
