import { PokemonBase, PokemonDetails } from '../models/pokemon.model';

export const MOCK_POKEMONS: PokemonBase[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 4,
    name: 'Charmander',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
];

export const MOCK_POKEMON_DETAILS: Record<number, PokemonDetails> = {
    1: {
        id: 1,
        name: 'Bulbasaur',
        image:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        description:'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
        types: [{ name: 'Grass' }, { name: 'Poison' }],
        stats: [
          { name: 'HP', value: 45 },
          { name: 'Attack', value: 49 },
          { name: 'Defense', value: 49 },
          { name: 'Special Atk', value: 65 },
          { name: 'Special Def', value: 65 },
          { name: 'Speed', value: 45 },
        ],
      },
      4: {
        id: 4,
        name: 'Charmander',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        description: 'Obviously prefers hot places.',
        types: [{ name: 'Fire' }],
        stats: [
          { name: 'HP', value: 39 },
          { name: 'Attack', value: 52 },
          { name: 'Defense', value: 43 },
          { name: 'Special Atk', value: 60 },
          { name: 'Special Def', value: 50 },
          { name: 'Speed', value: 65 },
        ],
      },
      7: {
        id: 7,
        name: 'Squirtle',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        description: 'Shoots water at prey while in the water.',
        types: [{ name: 'Water' }],
        stats: [
          { name: 'HP', value: 44 },
          { name: 'Attack', value: 48 },
          { name: 'Defense', value: 65 },
          { name: 'Special Atk', value: 50 },
          { name: 'Special Def', value: 64 },
          { name: 'Speed', value: 43 },
        ],
      },
    };