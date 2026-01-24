import { useState } from 'react';
import { usePokemon } from '../../hooks/usePokemon';
import { SearchBar } from '../../components/SearchBar';
import { PokemonCard } from '../../components/PokemonCard';
import { PokemonModal } from '../../components/PokemonModal';
import type { PokemonWithForm } from '../../types/pokemon';
import './PokedexPage.scss';

interface PokedexPageProps {
  optimized: boolean;
}

export function PokedexPage({ optimized }: PokedexPageProps) {
  const {
    pokemon,
    totalCount,
    loading,
    error,
    formFilter,
    setFormFilter,
    generationFilter,
    setGenerationFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = usePokemon({ optimized });

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonWithForm | null>(null);

  if (loading) {
    return (
      <div className="pokedex-page">
        <div className="pokedex-page__loading">
          <div className="pokedex-page__pokeball-loader" />
          <p className="pokedex-page__loading-text">Loading Pokémon data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokedex-page">
        <div className="pokedex-page__error">
          <span className="pokedex-page__error-icon">⚠️</span>
          <p className="pokedex-page__error-text">{error}</p>
          <button
            className="pokedex-page__retry-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pokedex-page">
      <SearchBar
        formFilter={formFilter}
        onFormFilterChange={setFormFilter}
        generationFilter={generationFilter}
        onGenerationFilterChange={setGenerationFilter}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalCount={totalCount}
        optimized={optimized}
      />

      {pokemon.length === 0 ? (
        <div className="pokedex-page__empty">
          <span className="pokedex-page__empty-icon">🔍</span>
          <p className="pokedex-page__empty-text">No Pokémon found</p>
          <p className="pokedex-page__empty-hint">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="pokedex-page__grid">
          {pokemon.map((poke, index) => (
            <PokemonCard
              key={`${poke.id}-${poke.formName}-${index}`}
              pokemon={poke}
              onClick={() => setSelectedPokemon(poke)}
            />
          ))}
        </div>
      )}

      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}
