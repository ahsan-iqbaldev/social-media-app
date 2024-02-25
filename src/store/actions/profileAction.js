import { toast } from "react-toastify";
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
    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();

    if (userDoc.exists) {
      const userData = { id: userDoc.id, ...userDoc.data() };
      dispatch({
        type: "GET_USER",
        payload: userData,
      });
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(IsLoader(false));
  }
};

export const updateProfile = (formData, uid) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));

    const userCollection = firebase.firestore().collection("users");
    const userDoc = await userCollection.doc(uid).get();

    if (userDoc.exists) {
      const imageFile = formData.profileImage;
      let imageUrl = userDoc.data().profileImage || "";

      if (imageFile) {
        const storageRef = firebase.storage().ref(`profile_images/${uid}`);
        const imageRef = storageRef.child(imageFile.name);

        await imageRef.put(imageFile);
        imageUrl = await imageRef.getDownloadURL();
      }
      await userCollection
        .doc(uid)
        .update({ ...formData, profileImage: imageUrl });

      toast.success("Update profile Sucessfully")
    } else {
      console.error("User document not found with the provided UID:", uid);
    }

    dispatch(IsLoader(false));
  } catch (error) {
    console.error("Error updating profile:", error.message);
    dispatch(IsLoader(false));
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};
