import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonTabs from '../components/PokemonTabs.tsx';
import TopBar from '../UI/TopBar.tsx';
import { Pokemon, Stat } from '../types/pokemon.ts';
import { PokemonEvolution } from '../types/pokemon-evolutions.ts';
import { PokemonStatistic } from '../types/pokemon-statistic.ts';
import { PokemonStatistics } from '../types/pokemon-statistics.ts';

import './PokemonDetails.scss';

const PokemonDetails = () => {
  const { pokemonId } = useParams();

  const [evolutions, setEvolutions] = useState<PokemonEvolution[]>([]);
  const [likedPokemon, setLikedPokemon] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [statistics, setStatistics] = useState<PokemonStatistic[]>([]);

  const likePokemon = () => {
    setLikedPokemon((prev) => !prev);
  };

  const urlToAxiosReq = (url: string) => axios.get(url);

  const getPokemonStats = useCallback(
    (urls: string[], currentStats: Stat[] | undefined) => {
      Promise.all(urls.map(urlToAxiosReq)).then((response) => {
        const stats: PokemonStatistic[] = response.map(
          ({ data }: { data: PokemonStatistics }) => {
            const pokemonStat = currentStats?.find(
              (stat) => stat.stat.name === data.name,
            );
            return {
              ...data,
              base_stat: pokemonStat?.base_stat ?? 0,
            };
          },
        );
        setStatistics(stats);
      });
    },
    [],
  );

  const getPokemonEvolutions = useCallback((urls: string[]) => {
    Promise.all(urls.map(urlToAxiosReq)).then((response) => {
      const evolutions: PokemonEvolution[] = response.map(({ data }) => data);
      setEvolutions(evolutions);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(({ data }: { data: Pokemon }) => {
        setPokemon(data);
        const statUrls = data.stats.map(({ stat }) => stat.url);
        const formsUrls = data.forms.map((form) => form.url);
        getPokemonStats(statUrls, data.stats);
        getPokemonEvolutions(formsUrls);
      });
  }, [getPokemonEvolutions, getPokemonStats, pokemonId]);

  return (
    <>
      {pokemon && (
        <div className="pokemon-details">
          <div className={'pokemon-info ' + pokemon.types[0].type.name}>
            <TopBar showBackButton={true} color="white">
              <i
                onClick={likePokemon}
                className={likedPokemon ? 'ri-heart-fill' : 'ri-heart-line'}
              />
            </TopBar>
            <div className="top-section">
              <h3 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map(({ type }, index) => (
                  <div className="type" key={index}>
                    {type.name}
                  </div>
                ))}
              </div>
              <h3 className="pokemon-order">#{pokemon.order}</h3>
              <img
                className="details-img"
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt=""
              />
            </div>
          </div>
          <PokemonTabs
            pokemon={pokemon}
            statistics={statistics}
            evolutions={evolutions}
          />
        </div>
      )}
    </>
  );
};

export default PokemonDetails;
