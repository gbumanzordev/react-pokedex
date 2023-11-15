import { NameUrlPair } from './pokemon.ts';

export interface PokemonStatistics {
  affecting_moves: AffectingMoves;
  affecting_natures: AffectingNatures;
  characteristics: Characteristic[];
  game_index: number;
  id: number;
  is_battle_only: boolean;
  move_damage_class: unknown;
  name: string;
  names: Name[];
}

export interface AffectingMoves {
  decrease: unknown[];
  increase: unknown[];
}

export interface AffectingNatures {
  decrease: unknown[];
  increase: unknown[];
}

export interface Characteristic {
  url: string;
}

export interface Name {
  language: NameUrlPair;
  name: string;
}
