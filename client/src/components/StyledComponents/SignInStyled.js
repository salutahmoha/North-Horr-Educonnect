import styled from "styled-components";
export const SignInContainer1 = styled.div`
  /* height: 50vh; */
`;
export const SignInContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  margin-top: 8rem;
  text-align: left;
  color: #000;
  border: 1px solid #333;
  padding: 2rem;
  background: var(--color-form);
`;

export const SignInHeading = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

export const SignInField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;
export const SignInLabel = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  width: 25%;
  text-align: left;
`;

export const SignInInput = styled.input`
  width: 75%;
  height: 2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem;
  outline: none;
`;

export const SignInButton = styled.button`
  background: var(--color-btn1);
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;
