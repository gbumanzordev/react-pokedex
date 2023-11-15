import { Link } from 'react-router-dom';
import PokemonType from './PokemonType.tsx';
import { Pokemon } from '../types/pokemon.ts';

import './PokemonCard.scss';

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <Link to={`/details/${pokemon.id}`}>
      <div className={'card ' + pokemon.types[0].type.name}>
        <div
          className="background"
          style={{
            background: `url(${pokemon.sprites.other['official-artwork'].front_default})`,
            backgroundPosition: '100% 90%',
            backgroundSize: '100px 100px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <h3 className="name">{pokemon.name}</h3>
          <div className="types">
            {pokemon.types.map((type, index) => (
              <PokemonType type={type} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
