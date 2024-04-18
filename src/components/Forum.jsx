import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function Forum(props) {
  const [comments, setComments] = useState("");
  const [userName, setusername] = useState("");
  const [userID, setuserID] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setusername(localStorage.getItem("userName"));
      setuserID(localStorage.getItem("userId"));
    }
  }, []);

  const handleSubmit = async () => {
    const reviewData = {
      userName,
      userID,
      comments,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/forum/forum",
        reviewData
      );
      setComments("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const serverErrorMessage = error.response.data.error;
        console.error("Error submitting review:", serverErrorMessage);
      } else {
        console.error("Error submitting review:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container pt-5">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control"
            placeholder="Comments"
            aria-label="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            style={{ borderRadius: "10px", height: "100px", resize: "none" }}
          />
          <button
            className="btn btn-danger"
            type="submit"
            style={{ backgroundColor: "black", borderColor: "black" }}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forum;
