import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import PokemonFilters from '@/components/PokemonFilters';
import PokemonGrid from '@/components/PokemonGrid';
import Pagination from '@/components/Pagination';

const PAGE_SIZE = 21;

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPokemon, setAllPokemon] = useState([]);
  const [activeTypes, setActiveTypes] = useState([]);
  const [filteredData, setFilteredData] = useState({ types: [], list: [] });
  const [listError, setListError] = useState(false);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1351')
      .then(response => {
        if (!response.ok) throw new Error('An error ocurred fetching the API');
        return response.json();
      })
      .then(data => {
        setAllPokemon(data.results);
        setListError(false);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        setListError(true);
      });
  }, []);

  useEffect(() => {
    const request =
      activeTypes.length === 0
        ? Promise.resolve(allPokemon)
        : Promise.all(
            activeTypes.map(type =>
              fetch(`https://pokeapi.co/api/v2/type/${type}`).then(response => {
                if (!response.ok)
                  throw new Error(`Failed to fetch type ${type}`);
                return response.json();
              })
            )
          ).then(results =>
            Array.from(
              new Map(
                results.flatMap(result =>
                  result.pokemon.map(entry => [
                    entry.pokemon.url,
                    entry.pokemon,
                  ])
                )
              ).values()
            )
          );

    request
      .then(list => {
        setFilteredData({ types: activeTypes, list });
        setListError(false);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        setListError(true);
      });
  }, [activeTypes, allPokemon]);

  const currentList = useMemo(
    () => (filteredData.types === activeTypes ? filteredData.list : []),
    [filteredData, activeTypes]
  );

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const totalPages = Math.max(1, Math.ceil(currentList.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageSlice = useMemo(
    () => currentList.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [currentList, safePage]
  );

  function resetPage() {
    setSearchParams(prev => {
      prev.delete('page');
      return prev;
    });
  }

  function handleTypeSelect(type) {
    if (type && !activeTypes.includes(type)) {
      setActiveTypes([...activeTypes, type]);
      resetPage();
    }
  }

  function handleClearTypes() {
    setActiveTypes([]);
    resetPage();
  }

  function handlePageChange(nextPage) {
    setSearchParams(prev => {
      prev.set('page', String(nextPage));
      return prev;
    });
  }

  return (
    <>
      <PokemonFilters
        activeTypes={activeTypes}
        onTypeSelect={handleTypeSelect}
        onClearTypes={handleClearTypes}
      />
      <PokemonGrid pokemonPage={pageSlice} error={listError} />
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Home;
