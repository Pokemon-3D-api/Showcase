import { useState, useEffect, useMemo } from 'react';
import { fetchPokemonData } from '../services/pokemonApi';
import type { Pokemon, PokemonWithForm } from '../types/pokemon';
import { generationRanges } from '../types/pokemon';

interface UsePokemonOptions {
  optimized: boolean;
}

interface UsePokemonReturn {
  pokemon: PokemonWithForm[];
  loading: boolean;
  error: string | null;
  formFilter: string;
  setFormFilter: (value: string) => void;
  generationFilter: string;
  setGenerationFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function usePokemon({ optimized }: UsePokemonOptions): UsePokemonReturn {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formFilter, setFormFilter] = useState('regular');
  const [generationFilter, setGenerationFilter] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPokemonData(optimized)
      .then((data) => {
        setAllPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error loading Pokemon data. Please check the API source or your network connection.');
        setLoading(false);
        console.error('Error loading data:', err);
      });
  }, [optimized]);

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

    return filtered;
  }, [allPokemon, formFilter, generationFilter, searchQuery]);

  return {
    pokemon,
    loading,
    error,
    formFilter,
    setFormFilter,
    generationFilter,
    setGenerationFilter,
    searchQuery,
    setSearchQuery,
  };
}
