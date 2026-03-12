import {
  PokemonColor,
  PokemonFilters,
  PokemonGeneration,
} from '../models/pokemon-filters.model';

export const DEFAULT_POKEMON_FILTERS: PokemonFilters = {
  type: null,
  ability: null,
  generation: null,
  color: null,
};

export const POKEMON_GENERATIONS: PokemonGeneration[] = [
  'generation-i',
  'generation-ii',
  'generation-iii',
  'generation-iv',
  'generation-v',
  'generation-vi',
  'generation-vii',
  'generation-viii',
  'generation-ix',
];

export const POKEMON_GENERATION_LABELS: Record<PokemonGeneration, string> = {
  'generation-i': 'Generation I',
  'generation-ii': 'Generation II',
  'generation-iii': 'Generation III',
  'generation-iv': 'Generation IV',
  'generation-v': 'Generation V',
  'generation-vi': 'Generation VI',
  'generation-vii': 'Generation VII',
  'generation-viii': 'Generation VIII',
  'generation-ix': 'Generation IX',
};

export const POKEMON_COLORS: PokemonColor[] = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
];

export const POKEMON_COLOR_LABELS: Record<PokemonColor, string> = {
  black: 'Black',
  blue: 'Blue',
  brown: 'Brown',
  gray: 'Gray',
  green: 'Green',
  pink: 'Pink',
  purple: 'Purple',
  red: 'Red',
  white: 'White',
  yellow: 'Yellow',
};