export type PokemonGeneration =
  | 'generation-i'
  | 'generation-ii'
  | 'generation-iii'
  | 'generation-iv'
  | 'generation-v'
  | 'generation-vi'
  | 'generation-vii'
  | 'generation-viii'
  | 'generation-ix';

export type PokemonColor =
  | 'black'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow';

export interface PokemonFilters {
  type: string | null;
  ability: string | null;
  generation: PokemonGeneration | null;
  color: PokemonColor | null;
}