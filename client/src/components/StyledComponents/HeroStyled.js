import Styled from "styled-components";
import Nh from "../../assets/NH4.jpg";

export const HeroContainer = Styled.div`
    height: 100vh;
    width: 100%;
    background-image: url(${Nh});
    background-position: center;
    background-size: cover;
    display: block;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    margin: 0;
    padding-top: 11rem;
    text-align: center;
`;

export const HeroHeading = Styled.h2`
  font-size: 5rem;
  font-weight: bold;
  color: var(--color-white);
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

export const HeroText = Styled.p`
color: var(--color-white);
font-size: 1.5rem;
padding-top: 1.5rem;
margin: 0 2rem;
`;
