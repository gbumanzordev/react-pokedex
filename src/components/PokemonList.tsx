import { useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard.tsx';
import { Pokemon } from '../types/pokemon.ts';

import './PokemonList.scss';

const PokemonList = ({
  items,
  loadMore,
}: {
  items: Pokemon[];
  loadMore?: () => void;
}) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMore && loadMore();
      }
    };

    const options = {
      root: null,
      rootMargin: '24px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(observerCallback, options);

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore]);

  return (
    <div className="list">
      {items.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
      <span id="load-more" ref={observerRef}></span>
    </div>
  );
};

export default PokemonList;
