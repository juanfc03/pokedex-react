import { Link } from 'react-router';
import '@/styles/Header.css';

function Header() {
  return (
    <header className="site-header">
      <h1 className="site-header__title">
        <Link to="/" className="site-header__text">
          POKEDEX_v1.0
        </Link>
      </h1>
    </header>
  );
}

export default Header;
