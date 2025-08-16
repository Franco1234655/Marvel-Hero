import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onFilterByUniverse: (universe: string) => void;
  onClearFilters: () => void;
  activeFilters: string[];
}

const SearchAndFilters = ({ onSearch, onFilterByUniverse, onClearFilters, activeFilters }: SearchAndFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const universes = [
    'Earth-616',
    'Earth-1610',
    'Earth-65',
    'Earth-928',
    'Earth-199999'
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleUniverseFilter = (universe: string) => {
    onFilterByUniverse(universe);
    setIsFiltersOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Rechercher un héros, nom réel ou univers..."
          className="marvel-input pl-10 pr-4"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="btn-marvel-secondary flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
            {activeFilters.length > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                {activeFilters.length}
              </span>
            )}
          </button>

          {/* Filters Dropdown */}
          {isFiltersOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border/50 rounded-lg shadow-lg z-10 animate-slide-up">
              <div className="p-4 space-y-3">
                <h3 className="font-orbitron font-medium text-sm text-foreground">
                  Filtrer par univers
                </h3>
                <div className="space-y-2">
                  {universes.map((universe) => (
                    <button
                      key={universe}
                      onClick={() => handleUniverseFilter(universe)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeFilters.includes(universe)
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                      }`}
                    >
                      {universe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Actifs:</span>
            {activeFilters.map((filter) => (
              <span
                key={filter}
                className="flex items-center space-x-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs border border-secondary/30"
              >
                <span>{filter}</span>
                <button
                  onClick={onClearFilters}
                  className="hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close filters */}
      {isFiltersOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchAndFilters;