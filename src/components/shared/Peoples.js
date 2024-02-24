import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Peoples = ({ posts}) => {
  console.log(posts, "postsbyahsan");

  const postArray = Array.isArray(posts) ? posts : [posts];

  return (
    <div>
      {postArray.map((post) => (
      <div className="grid-post text-center">
      <li className="m-auto min-w-80 h-80">
        <Link to={`/profile/${post?.id}`}>
        <div className="h-30 flex justify-center pt-10">
          <img
            src={post?.profileImage}
            alt="post"
            height={90}
            width={90}
          />
        </div>
          <h2 className="base-large lg:h3-bold text-light-1 mt-8">{post?.name}</h2>
          <p className="small-regular text-light-3 mt-2">@{post?.username}</p>
          </Link>

          <Button className="button_primary mt-4">
            Follow
          </Button>
      </li>
    </div>
      ))}
    </div>
  );
};

export default Peoples;
