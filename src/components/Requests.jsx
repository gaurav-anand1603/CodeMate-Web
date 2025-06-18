import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequests = async () => {
    const res = await axios.get(URL + "/user/requests/received", {
      withCredentials: true,
    });
    console.log(res.data?.data);
    dispatch(addRequest(res.data?.data));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const handleReview = async (status, reqId) => {
    try {
      await axios.post(
        URL + "/request/review/" + status + "/" + reqId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(reqId)); // <-- Remove from Redux instantly
    } catch (error) {
      console.log(error.message);
    }
  };
  if (requests.length === 0) {
    return (
      <h1 className="text-center text-3xl font-bold text-success mb-10">
        No Connection Requests
      </h1>
    );
  }

  return (
    <div className="px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-success mb-10">
        Connection Requests
      </h1>
      {requests.length === 0 ? (
        <h2 className="text-center text-base-content/70">
          No pending requests.
        </h2>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {requests.map((req) => {
            const user = req.fromUserId;
            return (
              <div
                key={user._id}
                className="w-full max-w-sm mx-auto bg-base-100 border border-success/30 shadow-md rounded-2xl p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={user.photoUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full object-cover border-4 border-success mb-4 shadow-md"
                />
                <h2 className="text-xl font-bold text-base-content">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-base-content/60">
                  {user.age} yrs • {user.gender}
                </p>
                <p className="italic text-base-content/60 mt-1">{user.about}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {user.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="badge badge-outline badge-success text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-6">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => {
                      handleReview("accepted", req._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => {
                      handleReview("rejected", requests._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Requests;
