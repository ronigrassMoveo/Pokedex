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

export const POKEMON_FILTER_TEXT = {
  TITLE: 'Filters',
  CLOSE_ARIA_LABEL: 'Close filters',
  TYPE_LABEL: 'Type',
  ABILITY_LABEL: 'Ability',
  GENERATION_LABEL: 'Generation',
  COLOR_LABEL: 'Color',
  ALL_OPTION: 'All',
  CLEAR_BUTTON: 'Clear',
  APPLY_BUTTON: 'Apply',
  DELETE_BUTTON: '✕'
};

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const;

export const POKEMON_TYPE_LABELS: Record<(typeof POKEMON_TYPES)[number], string> = {
  normal: 'Normal',
  fire: 'Fire',
  water: 'Water',
  electric: 'Electric',
  grass: 'Grass',
  ice: 'Ice',
  fighting: 'Fighting',
  poison: 'Poison',
  ground: 'Ground',
  flying: 'Flying',
  psychic: 'Psychic',
  bug: 'Bug',
  rock: 'Rock',
  ghost: 'Ghost',
  dragon: 'Dragon',
  dark: 'Dark',
  steel: 'Steel',
  fairy: 'Fairy',
};

export const POKEMON_ABILITIES = [
  'overgrow',
  'blaze',
  'torrent',
  'shield-dust',
  'shed-skin',
  'compound-eyes',
  'swarm',
  'keen-eye',
  'tangled-feet',
  'big-pecks',
  'run-away',
  'guts',
  'intimidate',
  'static',
  'sand-veil',
  'poison-point',
  'cute-charm',
  'flash-fire',
  'levitate',
] as const;

export const POKEMON_ABILITY_LABELS: Record<(typeof POKEMON_ABILITIES)[number], string> = {
  overgrow: 'Overgrow',
  blaze: 'Blaze',
  torrent: 'Torrent',
  'shield-dust': 'Shield Dust',
  'shed-skin': 'Shed Skin',
  'compound-eyes': 'Compound Eyes',
  swarm: 'Swarm',
  'keen-eye': 'Keen Eye',
  'tangled-feet': 'Tangled Feet',
  'big-pecks': 'Big Pecks',
  'run-away': 'Run Away',
  guts: 'Guts',
  intimidate: 'Intimidate',
  static: 'Static',
  'sand-veil': 'Sand Veil',
  'poison-point': 'Poison Point',
  'cute-charm': 'Cute Charm',
  'flash-fire': 'Flash Fire',
  levitate: 'Levitate',
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