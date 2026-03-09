export interface PokemonBase {
  id: number;
  name: string;
  image: string;
}

export interface PokemonTypeBadge {
  name: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetails extends PokemonBase {
  types: PokemonTypeBadge[];
  description: string;
  stats: PokemonStat[];
}