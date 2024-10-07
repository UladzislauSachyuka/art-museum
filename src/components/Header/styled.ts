import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 15vw;
  background: linear-gradient(90deg, #343333 38.05%, #484848 69.22%, #282828 98.98%);

  nav {
    display: flex;
    gap: 16px;
  }
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;

  &:visited {
    color: #ffffff;
  }

  &:hover {
    opacity: 0.8;
  }

  svg {
    margin-right: 4px;
    width: 24px;
    height: 24px;
  }
`;
