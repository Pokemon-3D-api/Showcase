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
    loading,
    error,
    formFilter,
    setFormFilter,
    generationFilter,
    setGenerationFilter,
    searchQuery,
    setSearchQuery,
  } = usePokemon({ optimized });

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonWithForm | null>(null);

  if (loading) {
    return (
      <div className="pokedex-page pokedex-page__loading">
        <p>Loading Pokemon data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokedex-page pokedex-page__error">
        <p>{error}</p>
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
      />

      {pokemon.length === 0 ? (
        <p className="pokedex-page__empty">No Pokemon found matching your criteria.</p>
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
