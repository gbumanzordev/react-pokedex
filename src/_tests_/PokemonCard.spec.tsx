import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PokemonCard from '../components/PokemonCard.tsx';
import { Pokemon } from '../types/pokemon.ts';

// describe the test
describe('PokemonCard', () => {
  // test the component
  it('should render', () => {
    // render the component
    const pokemon: Pokemon = {} as Pokemon;

    const { container } = render(<PokemonCard pokemon={pokemon} />);
    // assert the component is rendered
    expect(container.firstChild).toMatchSnapshot();
  });
});
