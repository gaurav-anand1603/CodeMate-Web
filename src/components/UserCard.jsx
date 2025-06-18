import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, gender, age, skills, photoUrl, about } = user;

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
            <button className="btn btn-primary">Interested</button>
            <button className="btn btn-primary">Ignored</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
