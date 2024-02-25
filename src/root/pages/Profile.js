import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPost } from "../../store/actions/savedAction";
import SavedPost from "../../components/shared/SavedPost";
import { Button } from "reactstrap";
import { getMyPosts, getUser } from "../../store/actions/profileAction";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts, isLoading, user } = useSelector((state) => state.profile);
  const { uid } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("posts");

  console.log(posts, "byahsan");

  useEffect(() => {
    dispatch(getMyPosts(id));
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        {isLoading ? "Loading..." : (<>
          <div className="flex flex-col md:flex-row w-full max-w-5xl mt-6">
          <div className="w-full md:w-1/5 md:mr-6 mb-5 md:mb-0">
            <div className="h-30 flex justify-left md:justify-center">
              <img
                src={user?.profileImage}
                alt="post"
                height={150}
                width={150}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="w-full md:w-4/5	">
            <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-12">
              <div className="flex flex-col">
                <h1 className="h1-bold">{user?.name}</h1>
                <p className="body-medium text-light-3 mt-1">
                  @{user?.username}
                </p>
              </div>
              <Link
                to={`/update-profile/${user?.id}`}
                className={`${user?.id !== uid && "hidden"}`}
              >
                <Button className="shad-button_dark_4">
                  <img src="/assets/icons/Pen New Square.svg" alt="" />
                  Edit Profile
                </Button>
              </Link>
              <div className={`flex gap-3 ${user?.id == uid && "hidden"}`}>
              <Button className="button_primary">
                Follow
              </Button>
              <Button className="button_secoundry">
                Message
              </Button>
              </div>
            </div>
            <div className="mt-3 md:mt-7">
              <div className="flex gap-10">
                <div>
                  <h3 className="h4-bold text-indigo-500">{posts?.length}</h3>
                  <p>Posts</p>
                </div>
                <div>
                  <h3 className="h4-bold text-indigo-500">147</h3>
                  <p>Followers</p>
                </div>
                <div>
                  <h3 className="h4-bold text-indigo-500">151</h3>
                  <p>Following</p>
                </div>
              </div>
              <p className="mt-4 md:mt-6 w-full md:w-[70%] leading-[1.6rem]">
              {user?.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-between w-full max-w-5xl mt-4 mb-3 md:mt-16 md:mb-7">
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab("posts")}
              className={`tab-btn pl-1 pr-6 py-2 md:px-12 md:py-3 flex gap-3 ${
                activeTab === "posts" ? "active-tab bg-gray-900 rounded-md" : ""
              }`}
            >
              <img src="/assets/icons/gallery-add.svg" alt="" />
              Posts
            </Button>
            <Button
              onClick={() => setActiveTab("reels")}
              className={`tab-btn pl-1 pr-6 py-2 md:px-12 md:py-3 flex gap-3 ${
                activeTab === "reels" ? "active-tab bg-gray-900 rounded-md" : ""
              }`}
            >
              <img src="/assets/icons/Clapperboard.svg" alt="" />
              Reels
            </Button>
            <Button
              onClick={() => setActiveTab("tags")}
              className={`tab-btn pl-1 pr-6 py-2 md:px-12 md:py-3 flex gap-3 ${
                activeTab === "tags" ? "active-tab bg-gray-900 rounded-md" : ""
              }`}
            >
              <img src="/assets/icons/Tag.svg" alt="" />
              Tagged
            </Button>
          </div>
          <div className="hidden md:flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
            <p className="small-medium md:base-medium text-light-2">All</p>
            <img
              src="/assets/icons/filter.svg"
              width={20}
              height={20}
              alt="filter"
            />
          </div>
        </div>
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="flex flex-wrap gap-9 w-full max-w-5xl">
            {activeTab === "posts" && (
              <ul className="grid-container">
                {posts?.map((item, index) => (
                  <SavedPost key={`page-${index}`} posts={item} />
                ))}
              </ul>
            )}
            {activeTab === "reels" && (
              <div className="text-xl text-blue-600">Reels</div>
            )}
            {activeTab === "tags" && (
              <div className="text-xl text-blue-600">tags</div>
            )}
          </div>
        )}
        </>)}

      </div>
    </div>
  );
};

export default Profile;
