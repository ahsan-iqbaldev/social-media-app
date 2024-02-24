import { useState } from "react";
import {
  handleLike,
  handleSaved,
  handleUnlike,
  handleUnsaved,
} from "../../store/actions/postAction";
import { useDispatch } from "react-redux";

const PostStats = ({ post, userId }) => {
  const dispatch = useDispatch();

  const hasLiked = post?.likes.some(
    (like) => like.userId === userId && like.liked
  );

  const hasSaved = post?.savedPosts.some(
    (save) => save.userId === userId && save.saved
  );

  const [likedStatus, setLikedStatus] = useState(hasLiked);
  const [savedStatus, setSavedStatus] = useState(hasSaved);

  const [likeCount, setLikeCount] = useState(post.likes.length);

  const handleLikePost = async () => {
    if (!likedStatus) {
      setLikedStatus(true);
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      await dispatch(handleLike(post.id, userId));
    } else {
      setLikedStatus(false);
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
      await dispatch(handleUnlike(post.id, userId));
    }
  };

  const handleSavedPost = async () => {
    if (!savedStatus) {
      setSavedStatus(true);
      await dispatch(handleSaved(post.id, userId));
    } else {
      setSavedStatus(false);
      await dispatch(handleUnsaved(post.id, userId));
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            likedStatus ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likeCount}</p>
      </div>

      <div className="flex gap-2">
        <img
          src={
            savedStatus ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"
          }
          alt="Save"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleSavedPost}
        />
      </div>
    </div>
  );
};

export default PostStats;
