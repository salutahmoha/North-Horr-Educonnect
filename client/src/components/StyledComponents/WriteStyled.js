import styled from "styled-components";

export const WriteContainer = styled.div`
border: 1px solid #333;
padding: 1.5rem;
width: 60%;
margin: 0 auto;
display: block;
margin-top: 5rem;
background-color: var(--color-form);
`;

export const LabelStyled = styled.label`
font-size: 1.3rem;
margin-bottom: 2rem;
font-weight: bold;
`;

export const InputStyled = styled.input`
width: 100%;
height: 2rem;
outline: none;
border: none;
border-radius: .1rem;
margin: .5rem 0;
padding-left: .4rem;
background-color: var(--color-white);
`;


export const ButtonStyled = styled.button`
width: 100%;
height: 2rem;
background-color: var(--color-btn1);
color: #fff;
border: none;
cursor: pointer;
border-radius: .3rem;
font-size: 1.2rem;
margin-top: 1rem;
`;