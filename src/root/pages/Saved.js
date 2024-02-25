import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPost } from "../../store/actions/savedAction";
import SavedPost from "../../components/shared/SavedPost";
import { Button } from "reactstrap";

const Saved = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const { posts, isLoading } = useSelector((state) => state.savedPosts);
  const [activeTab, setActiveTab] = useState("posts");

  console.log(posts, "byahsan");

  useEffect(() => {
    dispatch(getSavedPost(uid));
  }, [dispatch, uid]);

  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <div className="common-container flex-1">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/Vector.svg"
            alt="Add"
            height={36}
            width={36}
          />
          <h2 className="h3-bold md:h2-bold text-left-w-full">Saved Posts</h2>
        </div>
        <div className="flex-between w-full max-w-5xl mt-3 mb-3 md:mt-16 md:mb-7">
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
              onClick={() => setActiveTab("collection")}
              className={`tab-btn pl-1 pr-6 py-2 md:px-12 md:py-3 flex gap-3 ${
                activeTab === "collection"
                  ? "active-tab bg-gray-900 rounded-md"
                  : ""
              }`}
            >
              <img src="/assets/icons/collections.svg" alt="" />
              Collections
            </Button>
          </div>
          <div className=" hidden md:flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
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
            {activeTab === "collection" && (
              <div className="text-xl text-blue-600">Collection</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
