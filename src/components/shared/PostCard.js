import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const [storeTime, setStoreTime] = useState("");

  useEffect(() => {
    const createdAt = post.createdAt?.toDate();
    if (createdAt) {
      const timeAgo = formatDistanceToNow(createdAt, {
        addSuffix: true,
        includeSeconds: true,
        roundingMethod: "floor",
      });
      const timeAgoWithoutAbout = timeAgo.replace("about ", "");
      setStoreTime(timeAgoWithoutAbout);
    }
  }, [post.createdAt]);

  // if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile`}>
            <img
              src={post?.imageUrl || "./assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="rounded-full w-12 lg:h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {/* {post?.creator.name} */}
            </p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">
                {storeTime}
              </p>
              -
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        <Link
          to={`/update-post/`}
          className={`${user.userId !== post.uid && "hidden"}`}
        >
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>
      <Link to={`/posts`}>
        {post && (
          <div className="small-medium lg:base-medium py-5">
            <p>{post.caption}</p>
            <ul className="flex gap-1 mt-2">
              {post?.tags?.map((tag, index) => (
                <li key={index} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        )}
        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="Post Image"
          className="post-card_img"
        />
      </Link>
      {/* <PostStats post={post} userId={user.id}/> */}
    </div>
  );
};

export default PostCard;
