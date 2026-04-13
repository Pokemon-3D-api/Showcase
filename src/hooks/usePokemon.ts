import { useState, useEffect, useMemo } from 'react';
import { fetchPokemonData } from '../services/pokemonApi';
import type { Pokemon, PokemonWithForm, SortOption } from '../types/pokemon';
import { generationRanges } from '../types/pokemon';

interface UsePokemonReturn {
  pokemon: PokemonWithForm[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  formFilter: string;
  setFormFilter: (value: string) => void;
  generationFilter: string;
  setGenerationFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export function usePokemon(): UsePokemonReturn {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formFilter, setFormFilter] = useState('all');
  const [generationFilter, setGenerationFilter] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('id-asc');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPokemonData()
      .then((data) => {
        if (!cancelled) {
          setAllPokemon(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError('Error loading Pokemon data. Please check the API source or your network connection.');
          setLoading(false);
          console.error('Error loading data:', err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pokemon = useMemo(() => {
    const filtered: PokemonWithForm[] = [];
    const search = searchQuery.toLowerCase();

    allPokemon.forEach((poke) => {
      if (generationFilter !== 'all') {
        const [start, end] = generationRanges[generationFilter];
        if (poke.id < start || poke.id > end) {
          return;
        }
      }

      const matchingForms = poke.forms.filter((form) => {
        const matchesFormFilter = formFilter === 'all' || form.formName === formFilter;
        const matchesSearch =
          form.name.toLowerCase().includes(search) ||
          poke.id.toString().includes(search);
        return matchesFormFilter && matchesSearch;
      });

      matchingForms.forEach((form) => {
        filtered.push({
          ...form,
          id: poke.id,
        });
      });
    });

    // Sort the results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allPokemon, formFilter, generationFilter, searchQuery, sortBy]);

  return {
    pokemon,
    totalCount: pokemon.length,
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
  };
}
