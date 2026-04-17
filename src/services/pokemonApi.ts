import axios from 'axios';
import type { Pokemon } from '../types/pokemon';

const API_URL = 'https://pokemon-3d-api.onrender.com/v1/pokemon';

export async function fetchPokemonData(): Promise<Pokemon[]> {
  const response = await axios.get(API_URL);
  const data = response.data;
  return data.pokemon || data;
}
