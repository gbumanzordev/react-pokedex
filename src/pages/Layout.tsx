import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import PokemonList from '../components/PokemonList.tsx';
import TopBar from '../UI/TopBar.tsx';
import { ApiResponse } from '../types/api-response.ts';
import { NameUrlPair, Pokemon } from '../types/pokemon.ts';

import './Layout.scss';

const Layout = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [morePokemon, setMorePokemon] = useState<string>('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon | null>(null);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  const handleSearchPokemon = useCallback((term: string) => {
    if (term === '') {
      setFilteredPokemon(null);
      setNoRecordsFound(false);
      return;
    }
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + term.toLowerCase())
      .then(({ data }) => {
        setFilteredPokemon(data);
        setNoRecordsFound(false);
      })
      .catch(() => {
        setFilteredPokemon(null);
        setNoRecordsFound(true);
      });
  }, []);

  const getPagedPokemons = (url = 'https://pokeapi.co/api/v2/pokemon') => {
    return axios
      .get(url)
      .then(
        async (
          pokemonList: AxiosResponse<{ results: NameUrlPair[]; next: string }>,
        ) => {
          const urls = pokemonList.data.results.map(({ url }) =>
            axios.get(url),
          );
          const response = await Promise.all(urls);

          return {
            data: response.map(({ data }) => data),
            next: pokemonList.data.next,
          };
        },
      );
  };

  const loadMorePokemons = () => {
    if (morePokemon !== '' && pokemonList.length) {
      getPagedPokemons(morePokemon).then((response: ApiResponse) => {
        setPokemonList((prev) => [...prev, ...response.data]);
        setMorePokemon(response.next);
      });
    }
  };

  useEffect(() => {
    getPagedPokemons().then((response: ApiResponse) => {
      setPokemonList(response.data);
      setMorePokemon(response.next);
    });
  }, []);

  return (
    <div className="container">
      <TopBar
        showBackButton={false}
        color="black"
        onSearch={handleSearchPokemon}
      />
      <h1>Pokedex</h1>
      {!filteredPokemon && !noRecordsFound && (
        <PokemonList items={pokemonList} loadMore={loadMorePokemons} />
      )}
      {filteredPokemon && !noRecordsFound && (
        <PokemonList items={[filteredPokemon]} />
      )}
      {noRecordsFound && <h2>No Records Found...</h2>}
    </div>
  );
};

export default Layout;
