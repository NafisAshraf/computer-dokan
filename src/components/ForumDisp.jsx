import React, { useEffect, useState } from "react";
import axios from "axios";

const ForumDisp = () => {
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUserName(localStorage.getItem("userName"));
      setUserID(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/forum/get-forums"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    // Save reviews data to local storage when reviews state changes
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleReplyToggle = (index) => {
    const updatedReviewsCopy = [...reviews];
    updatedReviewsCopy[index].replyFormVisible =
      !updatedReviewsCopy[index].replyFormVisible;
    setReviews(updatedReviewsCopy);
  };

  const handleReplyChange = (index, value) => {
    const updatedReviewsCopy = [...reviews];
    updatedReviewsCopy[index].replyComment = value;
    setReviews(updatedReviewsCopy);
  };

  const handleReplySubmit = async (index, parentID) => {
    const replyComment = reviews[index].replyComment;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forum/forum",
        {
          userName,
          userID,
          parentID, // Include parent ID (forum ID) for the reply
          comments: replyComment,
        }
      );

      console.log(response.data); // Log the response from the backend, if needed

      const updatedReviewsCopy = [...reviews];
      updatedReviewsCopy[index].replyFormVisible = false;
      updatedReviewsCopy[index].replyComment = "";
      updatedReviewsCopy[index].replies.push({
        userName,
        comments: replyComment,
      });

      setReviews(updatedReviewsCopy);
    } catch (error) {
      console.error("Failed to submit reply:", error);
    }
  };

  const onDelete = async (forumId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/forum/delete-forum/${forumId}`
      );
      const filteredReviews = reviews.filter((forum) => forum._id !== forumId);
      setReviews(filteredReviews);
    } catch (error) {
      console.error("Failed to delete forum:", error);
    }
  };

  return (
    <div className="container">
      {reviews.map((forum, index) => (
        <div className="card mb-3" key={forum._id} style={{ marginLeft: 0 }}>
          <div className="card-header">
            <strong>{forum.userName}</strong>
          </div>
          <div className="card-body">
            <p className="card-text">{forum.comments}</p>
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleReplyToggle(index)}
              style={{ backgroundColor: "black" }}
            >
              Reply
            </button>
            {/* <button
              className="btn btn-danger"
              onClick={() => onDelete(forum._id)}
              style={{ backgroundColor: "black" }}
            >
              Delete
            </button> */}
            {forum.replyFormVisible && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(index, forum._id); // Pass forum ID as parent ID
                }}
              >
                <div className="form-group mt-3">
                  <textarea
                    id={`replyTextarea_${index}`} // Add unique id attribute
                    name={`replyTextarea_${index}`} // Add unique name attribute
                    className="form-control"
                    rows="3"
                    placeholder="Enter your reply"
                    value={forum.replyComment}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Reply
                </button>
              </form>
            )}
            {/* Render replies component only if there are replies */}
            {forum.replies.length > 0 && <Replies replies={forum.replies} />}
          </div>
        </div>
      ))}
    </div>
  );
};

const Replies = ({ replies }) => (
  <div>
    {replies.map((reply, index) => (
      <div className="card mb-3" key={index} style={{ marginLeft: "50px" }}>
        <div className="card-body">
          <strong>{reply.userName}</strong>
          <p className="card-text">{reply.comments}</p>
          {/* Render reply button on each reply */}
          <button className="btn btn-primary mr-2">Reply</button>
          {/* Render nested replies recursively */}
          {reply.replies && reply.replies.length > 0 && (
            <Replies replies={reply.replies} />
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ForumDisp;
