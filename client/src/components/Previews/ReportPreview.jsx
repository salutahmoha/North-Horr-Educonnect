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
  const [activeComment, setActiveComment] = useState(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [replies, setReplies] = useState({});
  const [commentLikes, setCommentLikes] = useState({});

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
      const response = await axios.get(`${apiBase}/report/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });

      const reportData = response.data;
      setReport(reportData);
      setLikes(reportData.likes?.length || 0); // Use the length of the likes array if it exists
      setLiked(reportData.likes?.some((like) => like.userId === user.id)); // Check if the user has already liked the report
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

  const handleLike = async () => {
    if (!user) {
      alert("Please log in to like this report.");
      return;
    }

    try {
      const response = await axios.post(
        `${apiBase}/report/${id}/like`, // Endpoint to like the report
        {}, // No body needed for the like action
        {
          headers: {
            Authorization: `Bearer ${user.token}`, // Include user token for authentication
          },
          withCredentials: true, // Ensure cookies are sent
        },
      );

      setLikes(response.data.likes); // Update the likes count
      setLiked(!liked); // Toggle the liked state
    } catch (error) {
      console.error("Error liking the report", error); // Log any errors to the console
    }
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
      setNewComment(""); // Clear the comment input
      setActiveComment(null); // Close the comment container
      fetchComments(); // Refresh the comments list
      setIsCommenting(false); // Hide the comment container
    } catch (err) {
      console.error("Error posting comment", err);
    }
  };

  const handleDelete = async () => {
    if (!user || user.role !== "admin") {
      alert("Only an admin can delete a report.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this report?",
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`${apiBase}/reports/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });
      alert("Report deleted successfully!");
      // Additional logic to update state if report list exists
    } catch (err) {
      console.error("Error deleting report", err);
    }
  };

  const handleReplySubmit = async (commentId, replyText) => {
    if (!user) {
      alert("Please log in to reply.");
      return;
    }

    try {
      await axios.post(
        `${apiBase}/comments/reply`,
        { text: replyText, commentId: commentId, reportId: id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        },
      );
      setNewComment(""); // Clear the reply input
      setReplies((prev) => ({ ...prev, [commentId]: false })); // Close the reply container
      fetchComments(); // Refresh the comments and replies
    } catch (err) {
      console.error("Error posting reply", err);
    }
  };
  const toggleCommentsVisibility = () => {
    setIsCommentsVisible((prev) => !prev);
  };

  // const handleShare = () => {
  //   const shareData = {
  //     title: schoolname,
  //     text: `Check out this report from ${schoolname}!`,
  //     url: window.location.href, // Use the current page URL
  //   };

  //   if (navigator.share) {
  //     navigator
  //       .share(shareData)
  //       .then(() => console.log("Report shared successfully"))
  //       .catch((err) => console.error("Error sharing", err));
  //   } else {
  //     // Fallback for unsupported browsers
  //     navigator.clipboard
  //       .writeText(shareData.url)
  //       .then(() => alert("Link copied to clipboard!"))
  //       .catch((err) => console.error("Failed to copy link", err));
  //   }
  // };

  // const handleCommentLike = async (commentId) => {
  //   if (!user) {
  //     alert("Please log in to like this comment.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       `${apiBase}/comments/${commentId}/like`, // Endpoint to like the comment
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         },
  //         withCredentials: true,
  //       },
  //     );

  //     setCommentLikes((prev) => ({
  //       ...prev,
  //       [commentId]: {
  //         liked: response.data.liked,
  //         likes: response.data.likesCount,
  //       },
  //     }));
  //   } catch (error) {
  //     console.error("Error liking the comment", error);
  //   }
  // };

  return (
    <ReportPreviewContainer>
      <div>
        <ReportNav>
          <OwnerProfile>
            <OwnerProfileImage>
              {report?.user?.profile?.profileImage ? (
                <img
                  src={report.user.profile.profileImage}
                  alt="User Profile"
                />
              ) : report?.user ? (
                <FontAwesomeIcon icon={faUser} size="3x" />
              ) : (
                <span>Unknown User</span>
              )}
            </OwnerProfileImage>

            <div>
              <OwnerName>
                {report?.user?.firstName && report?.user?.lastName
                  ? `${report?.user?.firstName} ${report?.user?.lastName}`
                  : "Unknown"}
              </OwnerName>
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
            <FaComment /> Comment
          </button>

          <button onClick={handleShare}>
            <FaShare /> Share
          </button>
        </ActionButtons>

        {isCommentsVisible && (
          <>
            <div className="comment-mapped">
              {comments.map((comment) => (
                <div key={comment.id} style={{ marginBottom: "1rem" }}>
                  {/* Parent Comment */}
                  <p>
                    <strong>{comment.user?.firstName || "Anonymous"}:</strong>{" "}
                    {comment.text}
                  </p>
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    style={{ marginRight: "0.5rem" }}
                  >
                    <FaThumbsUp
                      style={{
                        color: commentLikes[comment.id]?.liked
                          ? "#007bff"
                          : "#000",
                        cursor: "pointer",
                      }}
                    />
                    <span style={{ marginLeft: "0.5rem" }}>
                      {commentLikes[comment.id]?.likes || 0}
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setReplies((prev) => ({
                        ...prev,
                        [comment.id]: !prev[comment.id],
                      }))
                    }
                  >
                    Reply
                  </button>

                  {/* Render Reply Input for the Comment */}
                  {replies[comment.id] && (
                    <CommentContainer>
                      <TextareaComment
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <SendCommentButton
                        onClick={() =>
                          handleReplySubmit(comment.id, newComment)
                        }
                      >
                        <BiSolidSend />
                      </SendCommentButton>
                    </CommentContainer>
                  )}

                  {/* Render Replies */}
                  {comment.replies?.length > 0 && (
                    <div
                      style={{
                        paddingLeft: "1rem",
                        borderLeft: "2px solid #ccc",
                        marginTop: "0.5rem",
                      }}
                    >
                      {comment.replies.map((reply) => (
                        <div key={reply.id} style={{ marginBottom: "0.5rem" }}>
                          <p>
                            <strong>
                              {reply.user?.firstName || "Anonymous"}:
                            </strong>{" "}
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input for Adding New Comments */}
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
