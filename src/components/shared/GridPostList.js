// import { Models } from "appwrite";
import { Link } from "react-router-dom";
// import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
import { useSelector } from "react-redux";

const GridPostList = ({ posts, showUser = true, showStats = true }) => {
  console.log(posts, "postsbyahsan");
  //   const { user } = useUserContext();
  const { user } = useSelector((state) => state.auth);

  const postArray = Array.isArray(posts) ? posts : [posts];

  return (
    <div>
      {postArray.map((post) => (
        <li key={post?.id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post?.id}`} className="grid-post_link">
            <img
              src={post?.imageUrl}
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post?.creator?.profileImage ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post?.creator?.name}</p>
              </div>
            )}
            {showStats && <PostStats post={post} userId={user?.userId} />}
          </div>
        </li>
      ))}
    </div>
  );
};

export default GridPostList;
