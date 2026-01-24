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
  { value: 'regular', label: 'Regular' },
  { value: 'shiny', label: 'Shiny' },
  { value: 'alolan', label: 'Alolan' },
  { value: 'galar', label: 'Galarian' },
  { value: 'hisuian', label: 'Hisuian' },
  { value: 'mega', label: 'Mega' },
  { value: 'megaShiny', label: 'Mega Shiny' },
  { value: 'xy', label: 'Mega X/Y' },
  { value: 'sxy', label: 'Mega Shiny X/Y' },
  { value: 'gmax', label: 'G-Max' },
  { value: 'unique', label: 'Unique' },
  { value: 'primal', label: 'Primal' },
  { value: 'origin', label: 'Origin' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'fusionShiny', label: 'Fusion Shiny' },
  { value: 'multiform', label: 'Multi Form' },
  { value: 'multishinyform', label: 'Multi Shiny Form' },
  { value: 'all', label: 'All Forms' },
];

export const generationOptions = [
  { value: '1', label: 'Gen 1' },
  { value: '2', label: 'Gen 2' },
  { value: '3', label: 'Gen 3' },
  { value: '4', label: 'Gen 4' },
  { value: '5', label: 'Gen 5' },
  { value: '6', label: 'Gen 6' },
  { value: '7', label: 'Gen 7' },
  { value: '8', label: 'Gen 8' },
  { value: '9', label: 'Gen 9' },
  { value: 'all', label: 'All Generations' },
];
