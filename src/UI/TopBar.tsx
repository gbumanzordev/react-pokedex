import { Link } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';

import './TopBar.scss';
import SearchBar from './SearchBar.tsx';

const TopBar = ({
  showBackButton,
  children,
  color = 'black',
  onSearch,
}: {
  showBackButton: boolean;
  children?: ReactNode;
  color: 'white' | 'black';
  onSearch?: (term: string) => void;
}) => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (!showSearch) {
      onSearch && onSearch('');
    }
  }, [showSearch]);

  return (
    <>
      <div className="top-bar" style={{ color: color }}>
        <div className="back-button">
          {showBackButton && (
            <Link to="/">
              <i className="ri-arrow-left-line" style={{ color: color }} />
            </Link>
          )}
        </div>
        <div className="menu-burger">
          {!children && (
            <i
              className={showSearch ? 'ri-close-line' : 'ri-menu-line'}
              onClick={() => setShowSearch((prev) => !prev)}
            />
          )}
          {children}
        </div>
      </div>
      {showSearch && <SearchBar onSearch={onSearch} />}
    </>
  );
};

export default TopBar;
