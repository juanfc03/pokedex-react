import { useEffect, useState } from 'react';
import '@/styles/PokemonGrid.css';

function PokemonCard({ pokemon }) {
  return (
    <li className="content__grid-card">
      <header className="content__grid-head">
        <p className="content__grid-id">
          #{String(pokemon.id).padStart(3, '0')}
        </p>
        <h2 className="content__grid-name">{pokemon.name}</h2>
      </header>
      <img
        width="96"
        height="96"
        src={pokemon.sprites.front_default}
        alt={`${pokemon.name} image`}
      />
      <footer className="content__grid-foot">
        <ul className="content__grid-types">
          {pokemon.types.map(({ type }) => (
            <li
              key={type.name}
              className="content__grid-type"
              style={{ backgroundColor: `var(--type-${type.name})` }}
            >
              {type.name}
            </li>
          ))}
        </ul>
        <p className="content__grid-weight">{pokemon.weight / 10} kg</p>
      </footer>
    </li>
  );
}

function PokemonGrid() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => {
        if (!response.ok) throw new Error('An error ocurred fetching the API');
        return response.json();
      })
      .then(data =>
        Promise.all(
          data.results.map(pokemon =>
            fetch(pokemon.url).then(response => {
              if (!response.ok)
                throw new Error(`Failed to fetch ${pokemon.name}`);
              return response.json();
            })
          )
        )
      )
      .then(details => setPokemonList(details))
      .catch(error => console.log(`Error: ${error}`));
  }, []);

  return (
    <section className="content__list">
      <ul className="content__grid">
        {pokemonList.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </section>
  );
}

export default PokemonGrid;
