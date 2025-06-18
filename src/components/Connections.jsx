import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const getConnections = async () => {
    try {
      const res = await axios.get(URL + "/user/requests/connections", {
        withCredentials: true,
      });
      console.log("res", res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  useEffect(() => {
    getConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!connection.length) {
    return (
      <h1 className="flex justify-center my-10 text-2xl">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-success mb-10">
        Your Connections
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {connection.map((user) => (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
