import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import Comments from "./Comments";
import {
  ReportPreviewContainer,
  ImageReportStyled,
  BodyStyled,
  ActionButtons,
  ReportNav,
  OwnerProfileImage,
  OwnerProfile,
  OwnerName,
  ProfileMoreInfo,
  TextareaComment,
  CommentContainer,
  SendCommentButton,
} from "../StyledComponents/ReportPreview";
import apiBase from "../../utils/apiBase";
import useUserStore from "../../../../server/src/store/useStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { BiSolidSend } from "react-icons/bi";

function ReportPreview({ id, schoolname, image, body }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [report, setReport] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // New state to toggle comment visibility
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { user } = useUserStore();

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiBase}/comments/${id}`);
      setComments(response.data || []);
    } catch (err) {
      console.error("Error fetching comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const fetchReportDetails = async () => {
    try {
      const response = await axios.get(`${apiBase}/reports/${id}`);
      setReport(response.data);
      setComments(response.data.comments || []);
      setLikes(response.data.likes || 0);
    } catch (err) {
      console.error("Error fetching report details", err);
    }
  };

  useEffect(() => {
    fetchReportDetails();
  }, [id]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleLike = () => {
    setLiked((prevLiked) => {
      setLikes((prevLikes) => (prevLiked ? prevLikes - 1 : prevLikes + 1));
      return !prevLiked;
    });
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    try {
      await axios.post(
        `${apiBase}/comments`,
        { text: newComment, reportId: id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        },
      );
      setNewComment("");
      fetchComments();
      setIsCommenting(false);
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  // const handleDelete = async () => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete this report?");
  //   if (!isConfirmed) {
  //     return;
  //   }

  //   try {
  //     await axios.delete(`${apiBase}/reports/${id}`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //       withCredentials: true,
  //     });

  //     alert("Report deleted successfully!");

  //     // Update the state to remove the deleted report
  //     setReports((prevReports) => prevReports.filter((report) => report.id !== id));
  //   } catch (err) {
  //     console.error("Error deleting report", err);
  //   }
  // };

  // Toggle visibility of comments section
  const toggleCommentsVisibility = () => {
    setIsCommentsVisible((prev) => !prev);
  };

  return (
    <ReportPreviewContainer>
      <div>
        <ReportNav>
          <OwnerProfile>
            <OwnerProfileImage>
              {user?.user?.profileImage ? (
                <img src={user.user.profileImage} alt="User Profile" />
              ) : (
                <FontAwesomeIcon icon={faUser} size="3x" />
              )}
            </OwnerProfileImage>

            <div>
              <OwnerName>{`${user?.user?.firstName || ""} ${user?.user?.lastName || ""}`}</OwnerName>
              <p>
                {report
                  ? new Date(report.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : ""}
              </p>
            </div>
          </OwnerProfile>
          <div>
            <ProfileMoreInfo onClick={toggleMenu}>...</ProfileMoreInfo>
            {isMenuVisible && (
              <div className="menu">
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </ReportNav>
        <h2>{schoolname}</h2>
        <BodyStyled>
          <p
            className="body"
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? `${body} <span class="toggle-btn">Read Less</span>`
                : `${body.slice(0, 150)}... <span class="toggle-btn">Read More</span>`,
            }}
            onClick={toggleReadMore}
          />
        </BodyStyled>
        <ImageReportStyled src={image} alt={schoolname} />

        <ActionButtons>
          <button onClick={handleLike}>
            <FaThumbsUp
              style={{ color: liked ? "#007bff" : "#000", cursor: "pointer" }}
            />
            <span style={{ marginLeft: "0.5rem" }}>{likes}</span>
          </button>

          <button onClick={toggleCommentsVisibility}>
            {" "}
            {/* Toggle visibility of comments */}
            <FaComment /> Comment
          </button>

          <button>
            <FaShare /> Share
          </button>
        </ActionButtons>

        {/* Conditional rendering of comments and comment input */}
        {isCommentsVisible && (
          <>
            <div className="comment-mapped">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <p>
                    {comment.user}: {comment.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Show CommentContainer directly */}
            <CommentContainer>
              <TextareaComment
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
              />
              <SendCommentButton onClick={handleCommentSubmit}>
                <BiSolidSend />
              </SendCommentButton>
            </CommentContainer>
          </>
        )}
      </div>
      <Comments reportId={id} user={user} />
    </ReportPreviewContainer>
  );
}

export default ReportPreview;
