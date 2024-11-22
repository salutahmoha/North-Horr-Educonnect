import React from 'react'
import { EduNavbarContainer, LinkStyled, UlStyled, NavListingsStyled, LogoStyled, LiStyled} from '../../components/StyledComponents/EduNavbarStyled'
import { Link } from 'react-router-dom'
import logo from "../../assets/NHClogo-1.png";
function EduNavbar() {
  return (
    <EduNavbarContainer>
        <LogoStyled src={logo} alt="" />

        <NavListingsStyled>
            <UlStyled>
                <LinkStyled to="/Reports"><LiStyled>Reports</LiStyled></LinkStyled>
                <LinkStyled to="/Write"><LiStyled>Write</LiStyled></LinkStyled>
            </UlStyled>
        </NavListingsStyled>
    </EduNavbarContainer>
  )
}

export default EduNavbar