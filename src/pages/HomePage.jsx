import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Listing from "../components/Listing";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";

const HomePage = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthContext();

  return (
    <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <Navbar />
      <div className="container mx-auto d-flex justify-content-center">
        <Carousel />
      </div>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center"></div>

        <Listing />
      </div>
    </div>
  );
};

export default HomePage;
