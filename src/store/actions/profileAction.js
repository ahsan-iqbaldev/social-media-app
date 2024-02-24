import firebase from "../../config/firebase";

export const getMyPosts = (uid) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const snapshot = await firebase
      .firestore()
      .collection("posts")
      .where("uid", "==", uid)
      .orderBy("createdAt", "desc")
      .get();

    const myPosts = [];

    for (const doc of snapshot.docs) {
      const postData = { id: doc.id, ...doc.data() };

      myPosts.push(postData);
    }
    console.log(myPosts, "myposts");

    dispatch({
      type: "GET_MY_POSTS",
      payload: myPosts,
    });
    dispatch(IsLoader(false));
  } catch (error) {
    console.error("Error fetching my posts:", error);
    dispatch(IsLoader(false));
  }
};

export const getUser = (uid) => async (dispatch) => {
  try {
    // dispatch(IsLoader(true));
    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();

    if (userDoc.exists) {
      const userData  = { id: userDoc.id, ...userDoc.data() };
      dispatch({
        type: "GET_USER",
        payload: userData,
      });
    //   dispatch(IsLoader(true));
    } else {
      console.error("User not found");
    //   dispatch(IsLoader(false));
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(IsLoader(false));
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};
