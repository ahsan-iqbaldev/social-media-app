import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPost } from "../../store/actions/savedAction";
import SavedPost from "../../components/shared/SavedPost";
import { Button } from "reactstrap";
import ProfileForm from "../../components/shared/ProfileForm";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/editprofile.svg"
            alt="Add"
            height={36}
            width={36}
          />
          <h2 className="h3-bold md:h2-bold text-left-w-full">Edit Profile</h2>
        </div>
       <ProfileForm/>
      </div>
    </div>
  );
};

export default UpdateProfile;
