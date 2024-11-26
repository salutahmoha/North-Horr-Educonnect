import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FormContainer = styled.div`
  width: 70%;
  background: var(--color-bg);
  margin: 5rem auto;
  padding: 3rem;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Title = styled.h3`
  padding-bottom: 2rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #ccc;
`;

export const UpdatePersonalInfoButton = styled.button`
  margin-top: 2rem;
  width: 100%;
  padding: 1rem;
  font-size: 2rem;
  background: var(--color-btn);
  border: none;
  height: 3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
`;
