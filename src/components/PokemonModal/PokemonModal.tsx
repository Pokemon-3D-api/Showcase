import { useEffect, useRef, useState, useCallback } from 'react';
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
  const [modelError, setModelError] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Reset state when pokemon changes
  useEffect(() => {
    if (!pokemon) return;
    setModelError(false);
    setAnimations([]);
    setSelectedAnimation('');
  }, [pokemon]);

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

    const handleError = () => {
      setModelError(true);
    };

    modelViewer.addEventListener('load', handleLoad);
    modelViewer.addEventListener('error', handleError);
    return () => {
      modelViewer.removeEventListener('load', handleLoad);
      modelViewer.removeEventListener('error', handleError);
    };
  }, [pokemon]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer && selectedAnimation) {
      modelViewer.setAttribute('animation-name', selectedAnimation);
    }
  }, [selectedAnimation]);

  useEffect(() => {
    if (pokemon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [pokemon]);

  const handleDownload = useCallback(async () => {
    if (!pokemon || downloading) return;
    setDownloading(true);
    try {
      const response = await fetch(pokemon.model);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const formSuffix = pokemon.formName !== 'Regular' ? `_${pokemon.formName}` : '';
      a.href = url;
      a.download = `${pokemon.name}${formSuffix}.glb`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // silently fail - model may not be downloadable
    } finally {
      setDownloading(false);
    }
  }, [pokemon, downloading]);

  const handleClose = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.pause();
    }
    onClose();
  };

  if (!pokemon) return null;

  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <div className="pokemon-modal" onClick={handleClose}>
      <div className="pokemon-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="pokemon-modal__header">
          <div className="pokemon-modal__title-section">
            <span className="pokemon-modal__number">#{formattedId}</span>
            <h2 className="pokemon-modal__name">{pokemon.name}</h2>
            <span className="pokemon-modal__form">{pokemon.formName}</span>
          </div>
          <button onClick={handleClose} className="pokemon-modal__close">
            <span className="pokemon-modal__close-icon">✕</span>
          </button>
        </div>

        <div className="pokemon-modal__body">
          <div className="pokemon-modal__model-section">
            {modelError && (
              <div className="pokemon-modal__model-error">
                <span className="pokemon-modal__error-icon">?</span>
                <span className="pokemon-modal__error-text">Model not found</span>
              </div>
            )}
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
              style={{ display: modelError ? 'none' : 'block' }}
            />
          </div>

          {!modelError && (
            <div className="pokemon-modal__controls">
              <button
                className="pokemon-modal__download"
                onClick={handleDownload}
                disabled={downloading}
              >
                <span className="pokemon-modal__download-icon">
                  {downloading ? '⏳' : '⬇'}
                </span>
                {downloading ? 'Downloading...' : 'Download Model'}
              </button>

              {animations.length > 0 ? (
                <div className="pokemon-modal__control-group">
                  <label className="pokemon-modal__label">
                    <span className="pokemon-modal__label-icon">🎬</span>
                    Animation
                  </label>
                  <select
                    value={selectedAnimation}
                    onChange={(e) => setSelectedAnimation(e.target.value)}
                    className="pokemon-modal__select"
                  >
                    {animations.map((anim) => (
                      <option key={anim} value={anim}>
                        {anim}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="pokemon-modal__no-animations">No animations available</p>
              )}

              <div className="pokemon-modal__tips">
                <p className="pokemon-modal__tip">
                  <span className="pokemon-modal__tip-icon">🖱️</span>
                  Drag to rotate the model
                </p>
                <p className="pokemon-modal__tip">
                  <span className="pokemon-modal__tip-icon">🔍</span>
                  Scroll to zoom in/out
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
