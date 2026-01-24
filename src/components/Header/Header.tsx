import { NavLink } from 'react-router-dom';
import './Header.scss';

export function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Pokemon 3D Optimized Model Viewer</h1>
      <nav className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Non-Optimized
        </NavLink>
        <NavLink
          to="/optimized"
          className={({ isActive }) =>
            `header__link ${isActive ? 'header__link--active' : ''}`
          }
        >
          Optimized
        </NavLink>
      </nav>
    </header>
  );
}
