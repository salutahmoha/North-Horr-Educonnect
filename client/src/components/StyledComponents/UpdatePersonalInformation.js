import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const FormContainer = styled.div`
  width: 70%;
  background: var(--color-bg);
  margin: 5rem auto;
  padding: 1rem;
  border: 1px solid #333;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Title = styled.h3`
  padding-bottom: 1.4rem;
  font-size: 2rem;
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
  outline: none;
`;

export const UpdatePersonalInfoButton = styled.button`
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
