import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './pages/Layout.tsx';
import PokemonDetails from './pages/PokemonDetails.tsx';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route path="/details/:pokemonId" element={<PokemonDetails />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
