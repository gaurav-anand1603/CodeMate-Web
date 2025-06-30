import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(emailId + " " + password);
    console.log("Form submitted");
    try {
      const res = await axios.post(
        URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addFeed(null));
      dispatch(addUser(res.data.data));
      console.log(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      console.error("Login failed:", error.message);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + "/signup",
        { firstName, lastName, emailId, password },
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(null));
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={isLoginForm ? handleLogin : handleSignup}
        className="card bg-primary text-primary-content w-96"
      >
        <div className="card-body">
          <h2 className="card-title">
            {isLoginForm ? "Welcome Back" : "Get Started"}
          </h2>

          {!isLoginForm && (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary-content">
                    First Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input bg-white text-black"
                  required
                  value={firstName}
                  onChange={(firstName) => setFirstName(firstName.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary-content">
                    Last Name
                  </span>
                </label>
                <input
                  type="text"
                  className="input bg-white text-black"
                  required
                  value={lastName}
                  onChange={(lastName) => setLastName(lastName.target.value)}
                />
              </div>{" "}
            </>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Email ID</span>
            </label>
            <input
              type="email"
              className="input bg-white text-black"
              placeholder="you@example.com"
              required
              value={emailId}
              onChange={(email) => setEmailId(email.target.value)}
            />
          </div>

          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text text-primary-content">Password</span>
            </label>
            <input
              type="password"
              className="input bg-white text-black"
              placeholder="••••••••"
              required
              value={password}
              onChange={(pwd) => setPassword(pwd.target.value)}
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <p className="text-red-500 ">{error}</p>
            <button type="submit" className="btn btn-secondary">
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
        </div>
        <p
          className="text-center text-sm text-white mb-4 cursor-pointer hover:underline"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </form>
    </div>
  );
};

export default Login;
