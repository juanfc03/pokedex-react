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

function PokemonGrid({ pokemonPage, error }) {
  const [pageData, setPageData] = useState({
    pokemonPage: null,
    pokemonList: [],
  });
  const [detailError, setDetailError] = useState(false);

  useEffect(() => {
    Promise.all(
      pokemonPage.map(pokemon =>
        fetch(pokemon.url).then(response => {
          if (!response.ok) throw new Error(`Failed to fetch ${pokemon.name}`);
          return response.json();
        })
      )
    )
      .then(pokemonList => {
        setPageData({ pokemonPage, pokemonList });
        setDetailError(false);
      })
      .catch(error => {
        console.log(`Error: ${error}`);
        setDetailError(true);
      });
  }, [pokemonPage]);

  const pokemonList =
    pageData.pokemonPage === pokemonPage ? pageData.pokemonList : [];

  return (
    <section className="content__list">
      {error || detailError ? (
        <p className="content__error">
          Failed to load Pokémon. Check your connection and try again.
        </p>
      ) : pokemonList.length === 0 ? (
        <p className="content__loading">Loading...</p>
      ) : (
        <ul className="content__grid">
          {pokemonList.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default PokemonGrid;
