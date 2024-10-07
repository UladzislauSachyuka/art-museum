import { ReactComponent as Logo } from "@assets/icons/museum-logo.svg";
import { ReactComponent as FavoriteIcon } from "@assets/icons/bookmark.svg";
import { ReactComponent as HomeIcon } from "@assets/icons/home.svg";
import { StyledLink, HeaderContainer } from "./styled";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Logo />
      <nav>
        {location.pathname !== "/" && (
          <StyledLink to="/">
            <HomeIcon />
            Home
          </StyledLink>
        )}
        <StyledLink to="/favorites">
          <FavoriteIcon />
          Your favorites
        </StyledLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
