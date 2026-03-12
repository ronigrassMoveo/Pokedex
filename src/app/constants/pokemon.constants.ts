// API
export const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const POKEMON_ENDPOINTS = {
  pokemon: `${POKEMON_API_BASE_URL}/pokemon`,
  species: `${POKEMON_API_BASE_URL}/pokemon-species`,
};

// Pagination
export const PAGINATION = {
  FIRST_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
};

// Search
export const SEARCH = {
  EMPTY_QUERY: '',
};

export const SEARCH_HISTORY = {
  STORAGE_KEY: 'pokemon-search-history',
  MAX_ITEMS: 5,
};


// Images
export const POKEMON_IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';