import { Link } from "react-router-dom";

const SavedPost = ({ posts }) => {

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
        </li>
      ))}
    </div>
  );
};

export default SavedPost;
