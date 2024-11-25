import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaComment, FaShare, FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import Comments from './Comments';
import {
  ReportPreviewContainer,
  ImageReportStyled,
  BodyStyled,
  ActionButtons,
} from "../StyledComponents/ReportPreview";
import apiBase from "../../utils/apiBase";
import useUserStore from "../../../../server/src/store/useStore";

function ReportPreview({ id, schoolname, image, body }) {
  // const [likes, setLikes] = useState(0);
  // const [liked, setLiked] = useState(false);
  // const [isExpanded, setIsExpanded] = useState(false);
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState("");
  // const [isCommenting, setIsCommenting] = useState(false);

  // const { user } = useUserStore();

  // // Fetch comments for this report
  // const fetchComments = async () => {
  //   try {
  //     const response = await axios.get(`${apiBase}/comments/${id}`);
  //     setComments(response.data || []);
  //   } catch (err) {
  //     console.error("Error fetching comments", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, [id]);

  // const toggleReadMore = () => {
  //   setIsExpanded(!isExpanded);
  // };

  // const handleLike = () => {
  //   setLiked((prevLiked) => {
  //     setLikes((prevLikes) => (prevLiked ? prevLikes - 1 : prevLikes + 1));
  //     return !prevLiked;
  //   });
  // };

  // const handleCommentSubmit = async () => {
  //   if (!user) {
  //     alert("Please log in to comment.");
  //     return;
  //   }
  
  //   try {
  //     await axios.post(
  //       `${apiBase}/comments`,
  //       { text: newComment, reportId: id },
  //       {
  //           headers: { Authorization: `Bearer ${user.token}` },
  //           withCredentials: true, 
  //       });
  //     setNewComment("");
  //     fetchComments();
  //     setIsCommenting(false);
  //   } catch (err) {
  //     console.error("Error posting comment", err);
  //   }
  // };
  

  return (
    <ReportPreviewContainer>
      <div>
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

          <button onClick={() => setIsCommenting(true)}>
            <FaComment /> Comment
          </button>

          <button>
            <FaShare /> Share
          </button>
        </ActionButtons>

        {isCommenting && (
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleCommentSubmit}>
              <FaPaperPlane />
            </button>
          </div>
        )}

        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <p>
                {comment.user}: {comment.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Comments reportId={id} user={user} />
    </ReportPreviewContainer>
  );
}

export default ReportPreview;
