import axios from 'axios';
import type { Pokemon } from '../types/pokemon';

const API_ENDPOINTS = {
  optimized: 'https://pokemon-3d-api.onrender.com/v1/pokemon',
  nonOptimized: 'https://raw.githubusercontent.com/Pokemon-3D-api/api-server/refs/heads/main/server/json/Merged.json',
};

export async function fetchPokemonData(optimized: boolean): Promise<Pokemon[]> {
  const url = optimized ? API_ENDPOINTS.optimized : API_ENDPOINTS.nonOptimized;
  const response = await axios.get(url);
  const data = response.data;
  return data.pokemon || data;
}
