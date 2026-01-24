/* eslint-disable @typescript-eslint/no-namespace */
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-controls'?: boolean | string;
          'auto-rotate'?: boolean | string;
          autoplay?: boolean | string;
          'environment-image'?: string;
          'animation-name'?: string;
          ar?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}

export interface ModelViewerElement extends HTMLElement {
  availableAnimations: string[];
  pause: () => void;
  play: () => void;
}
