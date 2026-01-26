import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import type { PokemonWithForm } from '../../types/pokemon';
import type { ModelViewerElement } from '../../types/model-viewer';
import './PokemonCard.scss';

interface PokemonCardProps {
  pokemon: PokemonWithForm;
  onClick: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const formattedId = String(pokemon.id).padStart(3, '0');
  const modelViewerRef = useRef<ModelViewerElement | null>(null);
  const [animationCount, setAnimationCount] = useState<number | null>(null);
  const [modelError, setModelError] = useState(false);

  // Reset state when model changes
  useEffect(() => {
    setModelError(false);
    setAnimationCount(null);
  }, [pokemon.model]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      const count = modelViewer.availableAnimations?.length || 0;
      setAnimationCount(count);
    };

    const handleError = () => {
      setModelError(true);
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);
    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('error', handleError);
    };
  }, [pokemon.model]);

  return (
    <div onClick={onClick} className="pokemon-card">
      <div className="pokemon-card__header">
        <span className="pokemon-card__number">#{formattedId}</span>
        <span className="pokemon-card__form">{pokemon.formName}</span>
      </div>

      <div className="pokemon-card__model-container">
        {modelError && (
          <div className="pokemon-card__model-error">
            <span className="pokemon-card__error-icon">?</span>
            <span className="pokemon-card__error-text">Model not found</span>
          </div>
        )}
        <model-viewer
          ref={modelViewerRef as React.RefObject<HTMLElement>}
          src={pokemon.model}
          alt={`Model of ${pokemon.name}`}
          camera-controls
          auto-rotate
          autoplay
          environment-image="neutral"
          className="pokemon-card__model"
          style={{ display: modelError ? 'none' : 'block' }}
        />
        {!modelError && animationCount !== null && animationCount > 0 && (
          <span className="pokemon-card__anim-badge">▶ {animationCount}</span>
        )}
      </div>

      <div className="pokemon-card__info">
        <h2 className="pokemon-card__name">{pokemon.name}</h2>
        <div className="pokemon-card__action">
          <span className="pokemon-card__view-text">View Details</span>
          <span className="pokemon-card__arrow">→</span>
        </div>
      </div>
    </div>
  );
}
