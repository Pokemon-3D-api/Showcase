import { useEffect, useRef, useState } from 'react';
import '@google/model-viewer';
import type { PokemonWithForm } from '../../types/pokemon';
import type { ModelViewerElement } from '../../types/model-viewer';
import './PokemonModal.scss';

interface PokemonModalProps {
  pokemon: PokemonWithForm | null;
  onClose: () => void;
}

export function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const modelViewerRef = useRef<ModelViewerElement | null>(null);
  const [animations, setAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState('');

  useEffect(() => {
    if (!pokemon) return;

    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleLoad = () => {
      const availableAnims = modelViewer.availableAnimations || [];
      setAnimations(availableAnims);
      if (availableAnims.length > 0) {
        setSelectedAnimation(availableAnims[0]);
        modelViewer.setAttribute('animation-name', availableAnims[0]);
      }
    };

    modelViewer.addEventListener('load', handleLoad);
    return () => {
      modelViewer.removeEventListener('load', handleLoad);
    };
  }, [pokemon]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer && selectedAnimation) {
      modelViewer.setAttribute('animation-name', selectedAnimation);
    }
  }, [selectedAnimation]);

  const handleClose = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.pause();
    }
    onClose();
  };

  if (!pokemon) return null;

  return (
    <div className="pokemon-modal" onClick={handleClose}>
      <div className="pokemon-modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="pokemon-modal__close">
          X
        </button>

        <div className="pokemon-modal__animation-picker">
          <label className="pokemon-modal__label">Select Animation:</label>
          <select
            value={selectedAnimation}
            onChange={(e) => setSelectedAnimation(e.target.value)}
            className="pokemon-modal__select"
          >
            {animations.length > 0 ? (
              animations.map((anim) => (
                <option key={anim} value={anim}>
                  {anim}
                </option>
              ))
            ) : (
              <option disabled>No animations available</option>
            )}
          </select>
        </div>

        <model-viewer
          ref={modelViewerRef as React.RefObject<HTMLElement>}
          src={pokemon.model}
          alt={`Animated Pokemon Model - ${pokemon.name}`}
          camera-controls
          auto-rotate
          ar
          autoplay
          environment-image="neutral"
          className="pokemon-modal__model"
        />
      </div>
    </div>
  );
}
