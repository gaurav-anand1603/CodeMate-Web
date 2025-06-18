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
    <div className="flex justify-center my-10 text-2xl">
      <h1>Connections</h1>
      {connection.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default Connections;
