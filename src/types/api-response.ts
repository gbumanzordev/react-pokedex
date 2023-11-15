import { Pokemon } from './pokemon.ts';

export interface ApiResponse {
  data: Pokemon[];
  next: string;
}
