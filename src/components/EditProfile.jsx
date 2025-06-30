import axios from "axios";
import React, { useState, useEffect } from "react";
import { URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);

  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || " ");
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAge(user.age);
      setGender(user.gender);
      setPhotoUrl(user.photoUrl);
      setSkills(user.skills);
      setAbout(user.about);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.patch(
      URL + "/profile/edit",
      {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        skills,
        about,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(addUser(res?.data?.data));
    setShowToast(true);
  };

  return (
    <div className="flex justify-center items-start gap-10 min-h-screen bg-base-200 py-10">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="card bg-primary text-primary-content w-96"
      >
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>

          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">
                First Name
              </span>
            </label>
            <input
              type="text"
              className="input bg-white text-black"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Last Name</span>
            </label>
            <input
              type="text"
              className="input bg-white text-black"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Age */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Age</span>
            </label>
            <input
              type="number"
              className="input bg-white text-black"
              placeholder="25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Gender</span>
            </label>
            <select
              className="select bg-white text-black"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Photo Url</span>
            </label>
            <input
              type="url"
              className="input bg-white text-black"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">Skills</span>
            </label>
            <input
              type="text"
              className="input bg-white text-black"
              placeholder="JavaScript, React, CSS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          {/* About */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-primary-content">About</span>
            </label>
            <textarea
              className="textarea bg-white text-black"
              placeholder="Write something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="card-actions justify-end mt-4">
            <button type="submit" className="btn btn-secondary">
              Update Profile
            </button>
          </div>
        </div>
      </form>

      {/* User Card */}
      <div className="w-96">
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
