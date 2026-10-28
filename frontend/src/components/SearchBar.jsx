import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp } from 'lucide-react';

const POPULAR_SEARCHES = [
  'T-Shirts',
  'Sneakers',
  'Kurtas',
  'Jeans',
  'Dresses',
  'Watches',
  'Lipsticks',
  'Bed Linen',
  'Oversized Tees'
];

const SearchBar = ({ onSearchComplete, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm) => {
    const finalTerm = (searchTerm !== undefined ? searchTerm : query).trim();
    if (finalTerm) {
      setIsOpen(false);
      if (onSearchComplete) onSearchComplete();
      navigate(`/products?search=${encodeURIComponent(finalTerm)}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const clearInput = () => {
    setQuery('');
  };

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center">
          <Search size={18} strokeWidth={2.2} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for products, brands and more"
          className="w-full pl-10 pr-10 py-2.5 bg-gray-100 hover:bg-gray-50 focus:bg-white text-sm text-gray-800 placeholder-gray-500 rounded-md border border-transparent focus:border-pink-500 focus:outline-none transition-all shadow-inner"
        />
        {query && (
          <button
            type="button"
            onClick={clearInput}
            className="absolute right-3 text-gray-400 hover:text-gray-700 transition"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {/* Autocomplete / Suggestions dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in text-left">
          <div className="p-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp size={14} className="text-pink-500" />
              Popular Searches
            </span>
          </div>
          <div className="py-1">
            {POPULAR_SEARCHES.filter((item) =>
              query ? item.toLowerCase().includes(query.toLowerCase()) : true
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 flex items-center justify-between transition-colors"
              >
                <span>{item}</span>
                <span className="text-xs text-gray-400">in fashion</span>
              </button>
            ))}
            {query && (
              <button
                type="button"
                onClick={() => handleSearch(query)}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-pink-600 bg-pink-50/50 hover:bg-pink-100/60 border-t border-gray-100 flex items-center gap-2"
              >
                <Search size={14} />
                <span>Search for "{query}"</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
