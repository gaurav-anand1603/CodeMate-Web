import axios from "axios";
import React, { useEffect } from "react";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    const res = await axios.get(URL + "/feed", {
      withCredentials: true,
    });
    dispatch(addFeed(res.data));
  };

  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(feed);

  if (!feed) return null; // or a loading spinner/message

  return (
    <div className="p-6">
      {feed.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          No more users available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {feed.map((user, index) => (
            <UserCard key={user._id} user={feed[index]} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
