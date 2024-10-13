import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/icons/museum-logo.svg";
import { ReactComponent as FavoriteIcon } from "@assets/icons/bookmark.svg";
import { ReactComponent as HomeIcon } from "@assets/icons/home.svg";
import { ReactComponent as BurgerIcon } from "@assets/icons/menu.svg";
import useBurgerMenu from "hooks/useBurgerMenu";
import styles from "./Header.module.css";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { isOpen, toggleMenu, closeMenu } = useBurgerMenu();

  return (
    <header className={styles.header}>
      <Logo className={styles.mobileLogo} />
      <BurgerIcon className={styles.burgerIcon} onClick={toggleMenu} />
      <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ""}`}>
        {location.pathname !== "/" && (
          <Link to="/" className={styles.link} onClick={closeMenu}>
            <HomeIcon />
            Home
          </Link>
        )}
        <Link to="/favorites" className={styles.link} onClick={closeMenu}>
          <FavoriteIcon />
          Your favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
