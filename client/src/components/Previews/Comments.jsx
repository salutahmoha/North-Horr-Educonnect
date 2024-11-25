import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments({ reportId, user }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/comments/${reportId}`);
        console.log(response.data); // Log the response data to check if it's an array
        const fetchedComments = Array.isArray(response.data) ? response.data : [];
        setComments(fetchedComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [reportId]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "/comments",
        { text: newComment, reportId },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setComments([...comments, response.data]); // Add the new comment to the list
      setNewComment(""); // Clear the input field
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: "1rem" }}>
              <p>
                <strong>{comment.user.username}</strong>: {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {user && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
    </div>
  );
}

export default Comments;
