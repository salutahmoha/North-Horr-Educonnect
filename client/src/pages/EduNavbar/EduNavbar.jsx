import React from 'react';
import {
  EduNavbarContainer,
  LinkStyled,
  UlStyled,
  NavListingsStyled,
  LogoStyled,
  LiStyled,
} from '../../components/StyledComponents/EduNavbarStyled';
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../../../../server/src/store/useStore'; // Ensure the correct path to your store
import logo from "../../assets/NHClogo-1.png";

function EduNavbar() {
  const user = useUserStore((state) => state.user);
  const logoutUser = useUserStore((state) => state.logoutUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear user data in the store
    navigate('/SignIn'); // Redirect to the Sign-In page
  };

  return (
    <EduNavbarContainer>
      <LogoStyled src={logo} alt="Logo" />

      <NavListingsStyled>
        <UlStyled>
          <LinkStyled to="/Reports"><LiStyled>Reports</LiStyled></LinkStyled>
          <LinkStyled to="/Write"><LiStyled>Write</LiStyled></LinkStyled>
          <LinkStyled to="/Profile"><LiStyled>Profile</LiStyled></LinkStyled>
          <li
            onClick={handleLogout}
            className="logout"
            style={{ cursor: 'pointer', padding: '0 rem 2rem', color: 'red', fontSize: '1.2rem' }}
          >
            Logout
          </li>
          {user ? (
            <LinkStyled to="/user">
              <li>Hello {user.firstName}👋</li>
            </LinkStyled>
          ) : (
            <LinkStyled to="/SignIn">
              <li>Login</li>
            </LinkStyled>
          )}
        </UlStyled>
      </NavListingsStyled>
    </EduNavbarContainer>
  );
}

export default EduNavbar;
