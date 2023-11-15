import { Pokemon } from '../types/pokemon.ts';

const AboutTab = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div>
      <div className="info">
        <div className="label">Species:</div>
        <div className="value">{pokemon.species.name}</div>
        <div className="label">Height:</div>
        <div className="value lowercase">{pokemon.height}</div>
        <div className="label">Weight:</div>
        <div className="value lowercase">
          {pokemon.weight}lbs / ({Number(pokemon.weight / 2.2).toFixed(2)}kgs)
        </div>
        <div className="label">Abilities:</div>
        <div className="value">
          {pokemon.abilities.map((ability, index) => (
            <span key={index}>
              {index !== 0 ? ', ' : ''} {ability.ability.name}
            </span>
          ))}
        </div>
      </div>
      <div className="breeding">
        <h4>Breeding</h4>
        <div className="info">
          <div className="label">Gender</div>
          <div className="value">
            <i className="ri-men-line"></i> 24%{' '}
            <i className="ri-women-line"></i> 76%
          </div>
          <div className="label">Egg Groups</div>
          <div className="value"></div>
          <div className="label">Egg Cycle</div>
          <div className="value"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
