import { ThemeToggle } from '../ThemeToggle';
import './Header.scss';

export function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__pokeball" />
        <h1 className="header__title">Pokémon 3D Model Viewer</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
