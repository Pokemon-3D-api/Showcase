import axios from 'axios';
import type { Pokemon } from '../types/pokemon';

const API_URL = 'https://raw.githubusercontent.com/Pokemon-3D-api/api-server/refs/heads/main/server/json/MergedOpt.json';

export async function fetchPokemonData(): Promise<Pokemon[]> {
  const response = await axios.get(API_URL);
  const data = response.data;
  return data.pokemon || data;
}
