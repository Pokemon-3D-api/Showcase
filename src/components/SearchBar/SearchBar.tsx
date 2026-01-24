import { formOptions, generationOptions } from '../../types/pokemon';
import './SearchBar.scss';

interface SearchBarProps {
  formFilter: string;
  onFormFilterChange: (value: string) => void;
  generationFilter: string;
  onGenerationFilterChange: (value: string) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export function SearchBar({
  formFilter,
  onFormFilterChange,
  generationFilter,
  onGenerationFilterChange,
  searchQuery,
  onSearchQueryChange,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <select
        value={formFilter}
        onChange={(e) => onFormFilterChange(e.target.value)}
        className="search-bar__select"
      >
        {formOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={generationFilter}
        onChange={(e) => onGenerationFilterChange(e.target.value)}
        className="search-bar__select"
      >
        {generationOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        placeholder="Search Pokemon by Name or ID"
        className="search-bar__input"
      />

      <button className="search-bar__button">
        Search
      </button>
    </div>
  );
}
