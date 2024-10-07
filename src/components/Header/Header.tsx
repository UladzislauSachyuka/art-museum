import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/icons/museum-logo.svg";

const Header = () => {
  return (
    <header>
      <Logo />
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorites">Your favorites</Link>
      </nav>
    </header>
  );
};

export default Header;
