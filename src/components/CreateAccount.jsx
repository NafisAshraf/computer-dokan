import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signup");
  };
  return (
    <div className=" container d-flex flex-column align-items-center justify-content-center text-black">
      <div className="container p-5 border border-2 rounded rounded-3 w-75">
        <h2>I DON'T HAVE AN ACCOUNT</h2>
        <hr />
        <p className="fs-5">
          Enjoy added benefits and a richer experience by creating a personal
          account.
        </p>
        <hr />
        <h3 className="my-4">WHAT YOU'LL FIND IN ACCOUNT </h3>
        <div className="container-fluid p-0 d-flex flex-column gap-3 fs-5">
          <div>Access your order history</div>
          <div>Manage your personal information</div>
          <div>Register your wishlist</div>
          <div className="d-flex justify-content-end px-3">
        <button
          type="button"
          className="btn btn-dark mt-3"
          onClick={handleLoginClick}
        >
          Sign Up
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
