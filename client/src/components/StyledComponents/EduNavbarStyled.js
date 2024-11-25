import styled from "styled-components";
import { Link } from 'react-router-dom';

export const EduNavbarContainer = styled.div`
background-color: #333;
color: #fff;
height: 3rem;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 1rem;
position: fixed;
top: 0;
left: 0;
right: 0;
`;

export const LinkStyled = styled(Link)`
text-decoration: none;
  color: inherit;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  &:hover {
    color: #03c8fe;
  }

`;

export const UlStyled = styled.ul`
text-decoration: none;
list-style: none;
display: flex;
justify-content: center;
align-items: center;
gap: 2rem;
`;

export const NavListingsStyled = styled.div`
display: flex;
list-style: none;
text-decoration: none;
margin-right: 2rem;
`;

export const LiStyled = styled.li`
cursor: pointer;
list-style: none;
text-decoration: none;
`;

export const LogoStyled = styled.img`
width: 7rem;
height: auto;
`;