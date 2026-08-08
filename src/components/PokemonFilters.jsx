import '@/styles/PokemonFilters.css';
import { useState } from 'react';

const TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

function PokemonFilters() {
  const [selectedTypes, setSelectedTypes] = useState([]);

  function handleEvent(event) {
    const value = event.target.value;
    if (value && !selectedTypes.includes(value))
      setSelectedTypes([...selectedTypes, value]);
    event.target.value = '';
  }

  function clearFilters() {
    setSelectedTypes([]);
  }

  return (
    <form className="content__filters">
      <div className="content__filter-header">
        <h3 className="content__filter-title">filter_parameters</h3>
        <select
          id="pokemon-type"
          name="type"
          aria-label="Filter Pokémon by type"
          className="content__filter-select"
          onChange={handleEvent}
        >
          <option value="">+ more</option>
          {TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="content__filter-body">
        <ul className="content__filter-selected">
          {selectedTypes.length === 0 ? (
            <li className="content__filter-chip">No types selected</li>
          ) : (
            selectedTypes.map(type => (
              <li
                key={type}
                className="content__filter-chip"
                style={{
                  backgroundColor: `var(--type-${type})`,
                  color: 'var(--color-secondary)',
                }}
              >
                {type}
              </li>
            ))
          )}
        </ul>
        <button
          type="button"
          className="content__filter-clear"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}

export default PokemonFilters;
export { TYPES };
