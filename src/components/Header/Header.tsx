import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/icons/museum-logo.svg";
import { ReactComponent as FavoriteIcon } from "@assets/icons/bookmark.svg";
import { ReactComponent as HomeIcon } from "@assets/icons/home.svg";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <Logo />
      <nav className={styles.nav}>
        {location.pathname !== "/" && (
          <Link to="/" className={styles.link}>
            <HomeIcon />
            Home
          </Link>
        )}
        <Link to="/favorites" className={styles.link}>
          <FavoriteIcon />
          Your favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
