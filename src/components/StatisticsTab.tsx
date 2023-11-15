import { Fragment } from 'react';
import StatProgressBar from '../UI/StatProgressBar.tsx';

import './StatisticsTab.scss';
import { PokemonStatistic } from '../types/pokemon-statistic.ts';

const StatisticsTab = ({
  statistics,
  statisticNames,
}: {
  statistics: PokemonStatistic[];
  statisticNames: { [k: string]: string };
}) => {
  return (
    <>
      <div>
        <div className="info">
          {statistics &&
            statistics.map((stat) => (
              <Fragment key={stat.id}>
                <div className="label">{statisticNames[stat.name]}</div>
                <div className="value">
                  <StatProgressBar progress={stat.base_stat} />
                </div>
              </Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

export default StatisticsTab;
