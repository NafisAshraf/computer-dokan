import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { set } from "mongoose";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      console.log(fullName, email, password, phoneNumber, userType);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          fullName,
          email,
          password,
          phoneNumber,
          userType,
        }
      );
      setShowConfirmation(true);
      console.log(response.data.message);
    } catch (error) {
      console.error("Registration failed:", error.response.data);
    }
  };

  return (
    <div className="container-fluid bg-dark text-white vh-100">
      <div className="row bg-light border" style={{ height: "10%" }}>
        <h2 className="text-black py-3 px-2">Computer Dokan</h2>
      </div>
      <div className="row" style={{ height: "90%" }}>
        {showConfirmation ? (
          <div className="bg-secondary d-flex align-items-center justify-content-center col-12 col-lg-6">
            <div className="container w-75 bg-light rounded rounded-3 p-5">
              <h2 className="text-black text-center">Confirmation</h2>
              <p className="text-black text-center">
                You have successfully registered. Please check your email for
                verification.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-secondary d-flex align-items-center justify-content-center col-12 col-lg-6">
            <div className="container w-75 bg-light rounded rounded-3 p-5">
              <h2 className="text-black text-center">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className="form-group my-3">
                  <label htmlFor="fullName" className="text-black py-2 ps-2">
                    Full Name
                  </label>
                  <input
                    className="form-control"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="email" className="text-black py-2 ps-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="password" className="text-black py-2 ps-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group my-3">
                  <label
                    htmlFor="Phone Number"
                    className="text-black py-2 ps-2"
                  >
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="userType" className="text-black py-2 ps-2">
                    User Type
                  </label>
                  <select
                    id="userType"
                    className="form-control"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select User Type</option>
                    <option value="customer">Customer</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-dark mt-3 px-4 py-2">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="bg-light d-flex align-items-center col-12 col-lg-6">
          <div className=" container d-flex flex-column align-items-center justify-content-center text-black">
            <div className="container p-5 border border-2 rounded rounded-3 w-75">
              <h2>Already have an account?</h2>
              <hr />
              <p className="fs-5">
                You may login instead, if you already have an account
              </p>
              <hr />
              <h3 className="my-4">WHAT YOU'LL FIND IN ACCOUNT </h3>
              <div className="container-fluid p-0 d-flex flex-column gap-3 fs-5">
                <div>Access your order history</div>
                <div>Manage your personal information</div>
                <div>Register your wishlist</div>
                <div className="d-flex justify-content-end px-3">
                  <Link to={"/login"}></Link>
                  <button type="button" className="btn btn-dark mt-3">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
