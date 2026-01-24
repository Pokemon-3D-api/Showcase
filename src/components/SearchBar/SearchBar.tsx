import { useNavigate } from 'react-router-dom';
import { formOptions, generationOptions, sortOptions, type SortOption } from '../../types/pokemon';
import { GameSelect } from './GameSelect';
import './SearchBar.scss';

interface SearchBarProps {
  formFilter: string;
  onFormFilterChange: (value: string) => void;
  generationFilter: string;
  onGenerationFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  totalCount: number;
  optimized: boolean;
}

export function SearchBar({
  formFilter,
  onFormFilterChange,
  generationFilter,
  onGenerationFilterChange,
  searchQuery,
  onSearchQueryChange,
  sortBy,
  onSortChange,
  totalCount,
  optimized,
}: SearchBarProps) {
  const navigate = useNavigate();

  return (
    <div className="search-bar">
      <div className="search-bar__mode-toggle">
        <button
          className={`search-bar__mode-btn ${!optimized ? 'search-bar__mode-btn--active' : ''}`}
          onClick={() => navigate('/')}
        >
          Standard
        </button>
        <button
          className={`search-bar__mode-btn ${optimized ? 'search-bar__mode-btn--active' : ''}`}
          onClick={() => navigate('/optimized')}
        >
          Optimized
        </button>
      </div>

      <div className="search-bar__search-wrapper">
        <svg className="search-bar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Search Pok&eacute;mon..."
          className="search-bar__input"
        />
        {searchQuery && (
          <button
            className="search-bar__clear"
            onClick={() => onSearchQueryChange('')}
            aria-label="Clear search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="search-bar__filters">
        <GameSelect
          label="Gen"
          value={generationFilter}
          options={generationOptions}
          onChange={onGenerationFilterChange}
        />

        <GameSelect
          label="Form"
          value={formFilter}
          options={formOptions}
          onChange={onFormFilterChange}
        />

        <GameSelect
          label="Sort"
          value={sortBy}
          options={sortOptions}
          onChange={(value) => onSortChange(value as SortOption)}
        />
      </div>

      <div className="search-bar__result-count">
        <span className="search-bar__count-number">{totalCount}</span>
        <span className="search-bar__count-label">found</span>
      </div>
    </div>
  );
}
