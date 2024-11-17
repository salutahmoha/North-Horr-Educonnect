import styled from "styled-components";

export const SignUpContainer1 = styled.div`

height: 100vh;
`;
export const SignUpContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  margin-top: 5rem;
  text-align: left;
  color: #000;
  border: 1px solid #333;
  padding: 2rem;
  background: var(--color-form);
`;

export const SignUpField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SignUpHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;	
`;
export const SignUpLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  width: 30%;
  text-align: left;
`;

export const SignUpInput = styled.input`
  width: 70%;
  height: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  outline: none;
`;

export const SignUpButton = styled.button`
background: var(--color-btn1);
font-size: 1.2rem;
padding: 0.5rem 1rem;
border: none;
border-radius: 5px;
cursor: pointer;
`;

export const Logindiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 1rem;
gap: 1rem;
`;

export const Logintext = styled.p`
font-size: 1.2rem;
`;

export const LoginButton = styled.button`
background: none;
border: none;
cursor: pointer;
font-size: 1.2rem;
color: var(--color-btn1);
`;