import { useEffect, useState } from 'react';

import AboutTab from './AboutTab.tsx';
import EvolutionsTab from './EvolutionsTab.tsx';
import MovesTab from './MovesTab.tsx';
import StatisticsTab from './StatisticsTab.tsx';
import { Pokemon } from '../types/pokemon.ts';
import { PokemonEvolution } from '../types/pokemon-evolutions.ts';
import { PokemonStatistic } from '../types/pokemon-statistic.ts';
import { pokemonTabs } from '../utils/tabs.ts';

import './PokemonTabs.scss';

const PokemonTabs = ({
  pokemon,
  statistics,
  evolutions,
}: {
  pokemon: Pokemon;
  statistics: PokemonStatistic[];
  evolutions: PokemonEvolution[];
}) => {
  const [activeTab, setActiveTab] = useState('about');
  const [statisticNames, setStatisticNames] = useState<{ [k: string]: string }>(
    {},
  );

  useEffect(() => {
    statistics.forEach((stat) => {
      const name =
        stat.names.find(({ language }) => language.name === 'en')?.name ??
        stat.name;
      setStatisticNames((prev) => {
        return {
          ...prev,
          [stat.name]: name,
        };
      });
    });
  }, [statistics]);

  return (
    <div className="pokemon-tabs">
      <nav>
        <ul>
          {pokemonTabs.map((tab) => (
            <li
              key={tab.value}
              className={`${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>
      {activeTab === 'about' && <AboutTab pokemon={pokemon} />}
      {activeTab === 'stats' && (
        <StatisticsTab
          statistics={statistics}
          statisticNames={statisticNames}
        />
      )}
      {activeTab === 'evolution' && <EvolutionsTab evolutions={evolutions} />}
      {activeTab === 'moves' && <MovesTab />}
    </div>
  );
};

export default PokemonTabs;
