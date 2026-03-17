// API
export const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

export const POKEMON_ENDPOINTS = {
  pokemon: `${POKEMON_API_BASE_URL}/pokemon`,
  species: `${POKEMON_API_BASE_URL}/pokemon-species`,
};

// Header
export const HEADER_TEXT = {
  LOGO_ALT: 'Pokedex',
  OPEN_MENU_ARIA_LABEL: 'Open menu',
  CLOSE_MENU_ARIA_LABEL: 'Close menu',
  HOME_LABEL: 'Home',
  FAVORITES_LABEL: 'Favorites',
  CLOSE_BUTTON: '×',
} as const;

export const APP_ROUTES = {
  HOME: '',
  FAVORITES: 'favorites',
} as const;

// Pagination
export const PAGINATION = {
  FIRST_PAGE: 1,
  DEFAULT_PAGE_SIZE: 12,
};

// HomePage
export const HOME_PAGE_TEXT = {
  SEARCH_PLACEHOLDER: 'Search Pokémon',
  SEARCH_BUTTON: 'Search',
  FILTER_ARIA_LABEL: 'Open filters',
  NOT_FOUND_MESSAGE: 'Pokemon not found',
  LOAD_MORE: 'Load more...',
};

// Search
export const SEARCH = {
  EMPTY_QUERY: '',
};

export const SEARCH_HISTORY_TEXT = {
  STORAGE_KEY: 'pokemon-search-history',
  MAX_ITEMS: 5,
  TITLE: 'RECENT SEARCHES',
  CLEAR_BUTTON: 'CLEAR',
  REMOVE_BUTTON: '✕'
};

export const POKEMON_CARD_TEXT = {
  DESCRIPTION_TITLE: 'Description',
  STATS_TITLE: 'Stats',
  TOTAL_LABEL: 'Total',
  REMOVE_BUTTON: '✕'
};

export const ICON_SIZES = {
  FILTER: 22,
};

// Favorites
export const FAVORITES_TEXT = {
  STORAGE_KEY: 'favorite_pokemons',
  EMPTY_MESSAGE: 'No favorite Pokémon yet.',
  PAGE_TITLE: 'Favorites page',
  FAVORITE_ARIA_LABEL: 'Add to favorites',
  UNFAVORITE_ARIA_LABEL: 'Remove from favorites',
  REMOVE_ARIA_LABEL: 'Remove from favorites',
} as const;

// Images
export const POKEMON_IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';