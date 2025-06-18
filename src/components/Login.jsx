import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("Gaurav@gmail.com");
  const [password, setPassword] = useState("Gaurav@1234");
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
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
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data);
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="card bg-primary text-primary-content w-96"
      >
        <div className="card-body">
          <h2 className="card-title">Get Started</h2>

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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
