import styled from "styled-components";

export const UpdatePasswordContainer = styled.div`
  width: 100%;
`;

export const UpdatePasswordForm = styled.form`
  width: 70%;
  background: var(--color-bg);
  margin: 5rem auto;
  padding: 1rem;
  border: 1px solid #333;
`;

export const Heading = styled.h3`
  padding-bottom: 1rem;
  font-size: 2rem;
`;

export const PasswordField = styled.div`
  position: relative;
`;
export const UpdatePasswordLabel = styled.label`
  font-weight: bold;
  font-size: 1.2rem;
`;
export const PasswordInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
  outline: none;
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
  margin-top: 1rem;
  width: 100%;
  font-size: 1.5rem;
  background: var(--color-btn);
  border: none;
  height: 2.5rem;
  border-radius: 0.2rem;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
`;
