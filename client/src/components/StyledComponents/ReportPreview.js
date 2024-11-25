import styled from "styled-components";

export const ReportPreviewContainer = styled.div`
  border: 1px solid #333;
  padding: 1rem;
  width: 60%;
  margin: 0 auto;
  display: block;
  margin-top: 5rem;
  background-color: var(--color-form);
`;

export const ImageReportStyled = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  background-position: center;
  margin: .5rem 0;
  border-radius: 8px;
`;

export const BodyStyled = styled.div`
  .toggle-btn {
    color: #007bff;
    cursor: pointer;
    font-weight: bold;
  }

  .toggle-btn:hover {
    text-decoration: underline;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    color: var(--color-primary);
    padding: 0.5rem;

    &:hover {
      color: var(--color-secondary); 
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;