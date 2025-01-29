import {useEffect, useState} from 'react';
import { HiSearch} from 'react-icons/hi';

export function Header({changeSearch}){

    const [prevSearch, setPrevSearch] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() =>{
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    }, [])


    const change = (value) => {
      console.log(value);
      setPrevSearch(value);
    };

    const handleSearch = () => {
      changeSearch(prevSearch);
      if (prevSearch && !searchHistory.includes(prevSearch)) {
        const newSearchHistory = [prevSearch, ...searchHistory].slice(0, 5);
        setSearchHistory(newSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
      }
      
      setPrevSearch('');
    };

    const handleSelectHistory = (search) =>{
      setPrevSearch(search);
      changeSearch(search);
    };
    
    return (
        <section className="header-stl">
            <div className="space"></div>
            <div className="tittle">
                <h1>POKEDEX</h1>
                <h2>Generations 1,2 & 3</h2>
            </div>
            <nav className="nav-bar">
              <input
                className="input" 
                type="text" 
                placeholder="Buscar pokemon por nombre o ID" 
                value={prevSearch}
                onChange={(e) => change(e.target.value)}
              />
              {prevSearch && searchHistory.length > 0 && (
                <div className="search-history">
                  <ul>
                    {searchHistory.map((item, index) =>(
                      <li key={index} onClick={() => handleSelectHistory(item)}>{item}</li>
                    ))}
                  </ul>
                </div>
                )
              }
              <button className="button" onClick={handleSearch}><HiSearch/>Buscar</button>
            </nav>
        </section>
    );
}
