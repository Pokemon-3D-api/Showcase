import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.scss';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className={`theme-toggle__pokeball ${theme === 'dark' ? 'theme-toggle__pokeball--dark' : ''}`}>
        <div className="theme-toggle__pokeball-top" />
        <div className="theme-toggle__pokeball-center">
          <span className="theme-toggle__icon">
            {theme === 'light' ? '☀️' : '🌙'}
          </span>
        </div>
        <div className="theme-toggle__pokeball-bottom" />
      </div>
    </button>
  );
}
