export interface PokemonForm {
  name: string;
  formName: string;
  model: string;
}

export interface Pokemon {
  id: number;
  forms: PokemonForm[];
}

export interface PokemonWithForm extends PokemonForm {
  id: number;
}

export type SortOption = 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc';

export const generationRanges: Record<string, [number, number]> = {
  '1': [1, 151],
  '2': [152, 251],
  '3': [252, 386],
  '4': [387, 493],
  '5': [494, 649],
  '6': [650, 721],
  '7': [722, 809],
  '8': [810, 905],
  '9': [906, 1025],
};

export const formOptions = [
  { value: 'all', label: 'All Forms', icon: '🎭' },
  { value: 'regular', label: 'Regular', icon: '⚪' },
  { value: 'shiny', label: 'Shiny', icon: '✨' },
  { value: 'alolan', label: 'Alolan', icon: '🏝️' },
  { value: 'galar', label: 'Galarian', icon: '🛡️' },
  { value: 'hisuian', label: 'Hisuian', icon: '⛩️' },
  { value: 'mega', label: 'Mega', icon: '💎' },
  { value: 'megaShiny', label: 'Mega Shiny', icon: '💫' },
  { value: 'xy', label: 'Mega X/Y', icon: '🔀' },
  { value: 'sxy', label: 'Mega Shiny X/Y', icon: '🌟' },
  { value: 'gmax', label: 'G-Max', icon: '🏔️' },
  { value: 'unique', label: 'Unique', icon: '🦄' },
  { value: 'primal', label: 'Primal', icon: '🌋' },
  { value: 'origin', label: 'Origin', icon: '🌀' },
  { value: 'fusion', label: 'Fusion', icon: '🔗' },
  { value: 'fusionShiny', label: 'Fusion Shiny', icon: '⚡' },
  { value: 'multiform', label: 'Multi Form', icon: '🔄' },
  { value: 'multishinyform', label: 'Multi Shiny', icon: '🌈' },
];

export const generationOptions = [
  { value: 'all', label: 'All Gens', icon: '🌍' },
  { value: '1', label: 'Gen I', icon: '🔴', region: 'Kanto' },
  { value: '2', label: 'Gen II', icon: '🟡', region: 'Johto' },
  { value: '3', label: 'Gen III', icon: '🟢', region: 'Hoenn' },
  { value: '4', label: 'Gen IV', icon: '🔵', region: 'Sinnoh' },
  { value: '5', label: 'Gen V', icon: '⚫', region: 'Unova' },
  { value: '6', label: 'Gen VI', icon: '🟣', region: 'Kalos' },
  { value: '7', label: 'Gen VII', icon: '🟠', region: 'Alola' },
  { value: '8', label: 'Gen VIII', icon: '🩷', region: 'Galar' },
  { value: '9', label: 'Gen IX', icon: '🩵', region: 'Paldea' },
];

export const sortOptions = [
  { value: 'id-asc', label: 'Number ↑', icon: '🔢' },
  { value: 'id-desc', label: 'Number ↓', icon: '🔢' },
  { value: 'name-asc', label: 'Name A-Z', icon: '🔤' },
  { value: 'name-desc', label: 'Name Z-A', icon: '🔤' },
];
