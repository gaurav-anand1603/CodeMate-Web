import axios from "axios";
import React from "react";
import { URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { firstName, lastName, gender, age, skills, photoUrl, about } = user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        URL + "/request/send/" + status + "/" + toUserId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(user._id));
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            className="rounded-xl h-40 object-cover"
            alt="User"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p className="text-sm text-gray-600">{about}</p>
          <div className="mt-2 text-sm text-left w-full">
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>About:</strong> {about}
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              {skills && skills.length > 0 ? skills.join(", ") : "None"}
            </p>
          </div>
          <div className="card-actions mt-4 flex w-full justify-between">
            <button
              onClick={() => {
                handleSendRequest("interested", user._id);
              }}
              className="btn btn-primary"
            >
              Interested
            </button>
            <button
              onClick={() => {
                handleSendRequest("ignored", user._id);
              }}
              className="btn btn-primary"
            >
              Ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
