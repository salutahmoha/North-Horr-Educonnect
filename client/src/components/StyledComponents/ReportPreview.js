import styled from "styled-components";

export const ReportPreviewContainer = styled.div`
  border: 1px solid #333;
  padding: 0.4rem 1rem;
  width: 60%;
  margin: 0 auto;
  display: block;
  margin-top: 4rem;
  background-color: var(--color-form);
`;

export const ImageReportStyled = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  background-position: center;
  margin: 0.5rem 0;
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

export const ReportNav = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;

export const OwnerProfile = styled.div`
  display: flex;
  align-items: center;
`;

export const OwnerProfileImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #333;
  overflow: hidden;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const OwnerName = styled.h5`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ProfileMoreInfo = styled.p`
  font-size: 2rem;
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TextareaComment = styled.textarea`
  width: 100%;
  min-height: 3rem;
  resize: none;
  outline: none;
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
`;

export const SendCommentButton = styled.button`
  margin-left: 0.5rem;
  background: #007bff;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #0056b3;
  }
`;
