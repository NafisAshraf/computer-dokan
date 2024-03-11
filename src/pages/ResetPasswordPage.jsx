import React, { useEffect, useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handlePasswordReset = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/reset-password/:token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password, confirmPassword, token}),
            });
            const data = await response.json();
            console.log(data);
            navigate("/login");
        } catch (error) {
            console.error("Password reset failed:", error);
        }
    };

    return (
        <div className=" container d-flex flex-column align-items-center justify-content-center text-black py-5">
        <div className="container p-5 border border-2 rounded rounded-3 w-75">
            <h2>RESET YOUR PASSWORD</h2>
            <hr />
            <p className="fs-5">
            Please enter your new password and confirm the password.
            </p>
            <hr />
            <div className="container-fluid p-0 d-flex flex-column gap-3 fs-5">
            <div>
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
            <div>
                <label htmlFor="confirmPassword" className="text-black py-2 ps-2">
                Confirm Password
                </label>
                <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="d-flex justify-content-end px-3">
                <button
                type="button"
                className="btn btn-dark mt-3"
                onClick={handlePasswordReset}
                >
                Reset
                </button>
            </div>  
            </div>
        </div>
        </div>
    );
    }
export default ResetPassword;
