import { PokemonEvolution } from '../types/pokemon-evolutions.ts';

import './EvolutionsTab.scss';

const EvolutionsTab = ({ evolutions }: { evolutions: PokemonEvolution[] }) => {
  return <>{evolutions[0]?.name}</>;
};

export default EvolutionsTab;
