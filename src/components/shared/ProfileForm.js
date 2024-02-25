import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/actions/profileAction";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {  isLoading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const uid = user?.userId
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
    });
  }, [user]);

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState(
    user?.profileImage || "/default-profile-image.jpg"
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);

    const blobUrl = URL.createObjectURL(file);
    setCurrentProfileImage(blobUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      bio: formData.bio,
      profileImage: profileImageFile,
    };

    await dispatch(updateProfile(updatedData,uid))

    Navigate(`/profile/${uid}`)

    console.log("Updated Data:", updatedData);
  };

  return (
    <div className="max-w-5xl flex gap-3 w-full">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative">
            <img
              src={currentProfileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />

            <label
              htmlFor="profilePhoto"
              className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer"
            >
              Change
            </label>
            <input
              type="file"
              id="profilePhoto"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <p className="text-indigo-500">Change Profile Photo</p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="shad-form_label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shad-post-input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="shad-form_label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shad-post-input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="shad-form_label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shad-post-input"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="shad-form_label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            className="shad-textarea"
          ></textarea>
        </div>

        <button type="submit" className="button_primary">
          {isLoading ? "Loading..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
