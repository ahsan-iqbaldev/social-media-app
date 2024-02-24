import firebase from "../../config/firebase";

export const getSavedPost = (uid) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const savedSnapshot = await firebase
      .firestore()
      .collection("savedPosts")
      .where("userId", "==", uid)
      .get();

    const savedData = savedSnapshot.docs.map((savedDoc) => savedDoc.data());

    const posts = await Promise.all(
      savedData.map(async (savedPost) => {
        const postSnapshot = await firebase
          .firestore()
          .collection("posts")
          .doc(savedPost.postId)
          .get();

        if (postSnapshot.exists) {
          const postData = { id: postSnapshot.id, ...postSnapshot.data() };
          return postData;
        } else {
          return null;
        }
      })
    );

    const validPosts = posts.filter((post) => post !== null);
    dispatch({
      type: "GET_SAVED_POSTS",
      payload: validPosts,
    });
    dispatch(IsLoader(false));
  } catch (error) {
    console.error("Error getting saved posts:", error);
    dispatch(IsLoader(false));
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};
