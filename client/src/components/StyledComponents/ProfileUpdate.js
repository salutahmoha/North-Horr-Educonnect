import styled from "styled-components";

export const ProfileUpdateContainer = styled.div`
  width: 100%;
`;

export const ProfileForm = styled.div`
  width: 70%;
  background: #d3efd3;
  margin: 5rem auto;
  padding: 1rem;
  border: 1px solid #333;
`;

export const ProfileHeading = styled.h3`
  font-size: 2rem;
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  font-size: 1.2rem;
`;
export const ProfileUpdateInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
  outline: none;
`;

export const ProfileUpdateTextArea = styled.textarea`
  width: 100%;
`;

export const ProfileUpdateButton = styled.button`
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

export const ProfileImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  cursor: pointer;
  margin: 1rem 0;
  object-fit: cover;
`;
