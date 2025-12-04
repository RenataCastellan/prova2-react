// src/App.jsx
import { useState } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Busca Pokémon por nome completo ou prefixo
  const buscarPokemon = async (nome) => {
    const termo = nome.trim();

    if (!termo) {
      setError('Por favor, digite o nome de um Pokémon.');
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError('');
    setPokemon(null);

    try {
      // 1) Tentativa: nome exato
      let response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${termo.toLowerCase()}`
      );

      // 2) Se não achar, tenta por prefixo
      if (!response.ok) {
        const listResponse = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000'
        );

        if (!listResponse.ok) {
          throw new Error('Erro ao buscar lista de Pokémon.');
        }

        const listData = await listResponse.json();

        const pokemonEncontrado = listData.results.find((p) =>
          p.name.toLowerCase().startsWith(termo.toLowerCase())
        );

        if (!pokemonEncontrado) {
          throw new Error('Pokémon não encontrado.');
        }

        response = await fetch(pokemonEncontrado.url);

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do Pokémon.');
        }
      }

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro ao buscar Pokémon.');
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarPokemon(searchTerm);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="titulo-principal">Buscador de Pokémon</h1>
        <p className="subtitulo">
          Encontre informações detalhadas do seu Pokémon favorito.
        </p>
      </header>

      <section className="search-section">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome ou o início do nome (ex.: pika)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && (
          <div className="erro-message" role="alert">
            <p>⚠️ {error}</p>
          </div>
        )}
      </section>

      {loading && (
        <div className="loading">
          Carregando Pokémon...
        </div>
      )}

      {pokemon && !loading && <PokemonCard pokemon={pokemon} />}

      {!pokemon && !loading && !error && (
        <div className="welcome-message">
          <p>Bem-vindo! Digite o nome de um Pokémon para começar.</p>
        </div>
      )}
    </div>
  );
}

export default App;
