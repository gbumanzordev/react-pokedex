import { useEffect, useState } from 'react';

const SearchBar = ({ onSearch }: { onSearch?: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch && onSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeout);
  }, [onSearch, searchTerm]);

  return (
    <>
      <div className="search-bar">
        <h3>What pokemon are you looking for?</h3>
        <div className="search-input">
          <i className="ri-search-line"></i>
          <input type="text" onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
