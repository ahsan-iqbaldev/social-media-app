import { toast } from "react-toastify";
import firebase from "../../config/firebase";

export const addPost = (formData, uid) => async (dispatch) => {
  try {
    console.log(formData, formData);
    dispatch(IsLoader(true));
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`Posts/${formData.post[0].name}`);
    await imageRef.put(formData.post[0], {
      contentType: formData.post[0].type,
    });

    const imageUrl = await imageRef.getDownloadURL();
    console.log(imageUrl, "imageUrl");

    const postData = {
      uid: uid,
      caption: formData?.caption,
      location: formData?.location,
      tags: formData?.tags,
      imageUrl: imageUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    console.log(postData);

    await firebase.firestore().collection("posts").add(postData);
    dispatch(IsLoader(false));
  } catch (error) {
    console.log(error);
    dispatch(IsLoader(false));
  }
};

export const getPosts = (userId) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));

    firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      // .limit(5)
      .onSnapshot(async (snapshot) => {
        const posts = [];

        for (const doc of snapshot.docs) {
          const postData = { id: doc.id, ...doc.data() };

          const userSnapshot = await firebase
            .firestore()
            .collection("users")
            .doc(postData.uid)
            .get();
          const userData = { id: userSnapshot.id, ...userSnapshot.data() };

          const likesSnapshot = await firebase
            .firestore()
            .collection("likes")
            .where("postId", "==", doc.id)
            .get();

          const likesData = likesSnapshot.docs.map((likeDoc) => likeDoc.data());

          const savedSnapshot = await firebase
          .firestore()
          .collection("savedPosts")
          .where("postId", "==", doc.id)
          .where("userId", "==", userId)
          .get();

        const savedData = savedSnapshot.docs.map((savedDoc) => savedDoc.data());

          const postWithUserData = {
            ...postData,
            creator: userData,
            likes: likesData,
            savedPosts: savedData,
          };

          posts.push(postWithUserData);
        }

        console.log(posts, "ahsan");

        dispatch({
          type: "GET_POSTS",
          payload: posts,
        });

        dispatch(IsLoader(false));
      });
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch(IsLoader(false));
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const postSnapshot = await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get();
    const postData = postSnapshot.data();
    const uid = postData.uid;
    const userSnapshot = await firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const userData = userSnapshot.data();
    const combinedData = { ...postData, creator: userData };
    dispatch({
      type: "GET_SINGLE_POST",
      payload: combinedData,
    });
    dispatch(IsLoader(false));
  } catch (error) {
    console.log(error);
    dispatch(IsLoader(false));
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    console.log(id);
    await firebase.firestore().collection("posts").doc(id).delete();
    toast.success("Delete Post sucessfully");
  } catch (error) {
    console.log(error);
  }
};

export const handleLike = (postId, userId) => async (dispatch) => {
  try {
    const likesCollection = firebase.firestore().collection("likes");

    const existingLike = await likesCollection
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    if (existingLike.empty) {
      await likesCollection.add({
        postId: postId,
        userId: userId,
        liked: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Like added to Firestore");
    } else {
      console.log("Like already exists for this user and post");
    }
  } catch (error) {
    console.error("Error handling like:", error);
  }
};


export const handleUnlike = (postId, userId) => async (dispatch) => {
  try {
    const likesRef = firebase.firestore().collection("likes");
    const querySnapshot = await likesRef
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    if (!querySnapshot.empty) {
      const likeDocId = querySnapshot.docs[0].id;
      await likesRef.doc(likeDocId).delete();

      console.log("Like removed from Firestore");
    } else {
      console.log("Matching like not found");
    }
  } catch (error) {
    console.error("Error handling unlike:", error);
  }
};

export const handleSaved = (postId, userId) => async (dispatch) => {
  try {
    const savedCollection = firebase.firestore().collection("savedPosts");

    const existingSave = await savedCollection
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    if (existingSave.empty) {
      await savedCollection.add({
        postId: postId,
        userId: userId,
        saved: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Saved added to Firestore");
    } else {
      console.log("Saved already exists for this user and post");
    }
  } catch (error) {
    console.error("Error handling like:", error);
  }
};


export const handleUnsaved = (postId, userId) => async (dispatch) => {
  try {
    const saveRef = firebase.firestore().collection("savedPosts");
    const querySnapshot = await saveRef
      .where("postId", "==", postId)
      .where("userId", "==", userId)
      .get();

    if (!querySnapshot.empty) {
      const savedDocId = querySnapshot.docs[0].id;
      await saveRef.doc(savedDocId).delete();

      console.log("saved removed from Firestore");
    } else {
      console.log("Matching like not found");
    }
  } catch (error) {
    console.error("Error handling unlike:", error);
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};

