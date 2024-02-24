import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/shared/PostCard";
import { getPosts } from "../../store/actions/postAction";

const Home = () => {
  const { posts, isLoading } = useSelector((state) => state.post);
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(posts, "posts");

  useEffect(() => {
    dispatch(getPosts(uid));
  }, []);

  console.log(posts, "postsAhsan");

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <div className="flex-between w-full max-w-5xl mt-2 mb-2">
            <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

            <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
              <p className="small-medium md:base-medium text-light-2">All</p>
              <img
                src="/assets/icons/filter.svg"
                width={20}
                height={20}
                alt="filter"
              />
            </div>
          </div>
          {isLoading && !posts ? (
            <h2>Loading...</h2>
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.map((post, index) => (
                <PostCard post={post} key={index + 100} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
