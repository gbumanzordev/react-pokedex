import { Type } from '../types/pokemon.ts';

import './PokemonType.scss';

const PokemonType = ({ type }: { type: Type }) => {
  return <div className="pill">{type.type.name}</div>;
};

export default PokemonType;
