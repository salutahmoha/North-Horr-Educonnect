import styled from 'styled-components';

export const UpdatePasswordContainer = styled.div`
  width: 100%;
`;

export const UpdatePasswordForm = styled.form`
  width: 70%;
  background: var(--color-bg);
  margin: 5rem auto;
  padding: 2.5rem;
`;

export const Heading = styled.h3`
  padding-bottom: 2rem;
`;

export const PasswordField = styled.div`
  position: relative;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding-right: 2.5rem; /* Add space for the icon inside the input */
  box-sizing: border-box;
`;

export const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 1.7rem;
`;

export const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 3rem auto;
  font-size: 2rem;
  background: var(--color-btn);
  border: none;
  height: 3rem;
  border-radius: .4rem;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
`;
