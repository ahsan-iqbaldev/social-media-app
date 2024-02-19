import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost, getSinglePost } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { formatDistanceToNow } from "date-fns";
import DeleteBox from "../../components/shared/DeleteBox";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { singlePost, isLoading } = useSelector((state) => state.post);
  const post = singlePost;

  const [storeTime, setStoreTime] = useState("");
  const [deleteBox, setDeleteBox] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getSinglePost(id));
      } catch (error) {
        console.error("Error fetching single post:", error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    const createdAt = post?.createdAt?.toDate();
    if (createdAt) {
      const timeAgo = formatDistanceToNow(createdAt, {
        addSuffix: true,
        includeSeconds: true,
        roundingMethod: "floor",
      });
      const timeAgoWithoutAbout = timeAgo.replace("about ", "");
      setStoreTime(timeAgoWithoutAbout);
    }
  }, [post?.createdAt]);

  const handleDeletePost = () => {
    setDeleteBox(true);
  };
  const handleCancelDelete = () => {
    setDeleteBox(false);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deletePost(id));
    setDeleteBox(false);
    navigate("/");
  };

  return (
    <div className="post_details-container">
      {isLoading ? (
        "Loading....."
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="Post detail"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator?.id}`}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    post?.creator?.profileImage ||
                    "./assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-10 h-10 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator?.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {storeTime}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className="flex-center gap-4">
                <Link
                  to={`/update-post/${post?.id}`}
                  className={`${user.userId !== post?.uid && "hidden"}`}
                >
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    height={24}
                    width={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${
                    user.userId !== post?.uid && "hidden"
                  }`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              {/* <PostStats post={post} userId={user.id} /> */}
            </div>
          </div>
        </div>
      )}
      {deleteBox && (
        <DeleteBox
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default PostDetails;
