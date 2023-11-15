import { NameUrlPair } from './pokemon.ts';

export interface PokemonEvolution {
  form_name: string;
  form_names: string[];
  form_order: number;
  id: number;
  is_battle_only: boolean;
  is_default: boolean;
  is_mega: boolean;
  name: string;
  names: any[];
  order: number;
  pokemon: NameUrlPair;
  sprites: Sprites;
  types: Type[];
  version_group: NameUrlPair;
}

export interface Type {
  slot: number;
  type: NameUrlPair;
}

export interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}
