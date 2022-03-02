import './Header.css';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';

function Header() {
  return (
    <header className="header">
      <Link to={routes.mainPage} className="header__link">
        <h1 className="header__title">Hacker News</h1>
      </Link>
    </header>
  );
}

export default Header;
