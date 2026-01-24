import '@google/model-viewer';
import type { PokemonWithForm } from '../../types/pokemon';
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: PokemonWithForm;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  return (
    <div onClick={onClick} className="pokemon-card">
      <model-viewer
        src={pokemon.model}
        alt={`Model of ${pokemon.name}`}
        camera-controls
        auto-rotate
        autoplay
        environment-image="neutral"
        className="pokemon-card__model"
      />
      <div className="pokemon-card__id">ID: {pokemon.id}</div>
      <h2 className="pokemon-card__name">{pokemon.name}</h2>
    </div>
  );
}
