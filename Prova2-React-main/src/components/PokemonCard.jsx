// src/components/PokemonCard.jsx
import PropTypes from 'prop-types';
import './PokemonCard.css';

function PokemonCard({ pokemon }) {
  if (!pokemon) return null;

  const tipos = pokemon.types?.map((tipo) => tipo.type.name) ?? [];
  const habilidades =
    pokemon.abilities?.map((ab) => ab.ability.name) ?? [];

  const pesoKg = typeof pokemon.weight === 'number'
    ? pokemon.weight / 10
    : null;

  const alturaM = typeof pokemon.height === 'number'
    ? pokemon.height / 10
    : null;

  const officialArtwork =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default ||
    '';

  const handleImageError = (event) => {
    event.target.style.display = 'none';
  };

  return (
    <article className="pokemon-card">
      <div className="pokemon-header">
        <h2 className="pokemon-nome">{pokemon.name}</h2>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>

      <div className="pokemon-imagem-container">
        {officialArtwork ? (
          <img
            src={officialArtwork}
            alt={pokemon.name}
            className="pokemon-imagem"
            onError={handleImageError}
          />
        ) : (
          <p>Imagem não disponível.</p>
        )}
      </div>

      <div className="pokemon-info">
        <section className="info-section">
          <h3>Tipos</h3>
          <div className="tipos-container">
            {tipos.length > 0 ? (
              tipos.map((tipo) => (
                <span key={tipo} className="tipo-badge">
                  {tipo}
                </span>
              ))
            ) : (
              <p>Tipos não informados.</p>
            )}
          </div>
        </section>

        <section className="info-section">
          <h3>Estatísticas</h3>
          <div className="stats-container">
            {pokemon.stats && pokemon.stats.length > 0 ? (
              pokemon.stats.map((stat) => (
                <div
                  key={stat.stat.name}
                  className="stat-item"
                >
                  <span className="stat-name">
                    {stat.stat.name}
                  </span>
                  <span className="stat-value">
                    {stat.base_stat}
                  </span>
                </div>
              ))
            ) : (
              <p>Estatísticas não disponíveis.</p>
            )}
          </div>
        </section>

        <section className="info-section">
          <h3>Habilidades</h3>
          <div className="habilidades-container">
            {habilidades.length > 0 ? (
              habilidades.map((habilidade) => (
                <span
                  key={habilidade}
                  className="habilidade-badge"
                >
                  {habilidade}
                </span>
              ))
            ) : (
              <p>Habilidades não informadas.</p>
            )}
          </div>
        </section>

        <section className="info-section">
          <h3>Peso e Altura</h3>
          <div className="peso-altura">
            <p>
              {pesoKg != null
                ? `Peso: ${pesoKg} kg`
                : 'Peso não informado.'}
            </p>
            <p>
              {alturaM != null
                ? `Altura: ${alturaM} m`
                : 'Altura não informada.'}
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}

PokemonCard.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonCard;
