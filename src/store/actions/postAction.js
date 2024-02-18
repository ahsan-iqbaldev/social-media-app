import firebase from "../../config/firebase";

export const addPost = (formData, uid) => async (dispatch) => {
  try {
    console.log(formData, formData);
    dispatch(IsLoader(true));
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`Posts/${formData.post[0].name}`);
    await imageRef.put(formData.post[0], { contentType: formData.post[0].type });

    const imageUrl = await imageRef.getDownloadURL();
    console.log(imageUrl, "imageUrl");


    const postData = {
      uid: uid,
      caption: formData?.caption,
      location: formData?.location,
      tags: formData?.tags.split(","),
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

export const getPosts = () => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const snapshot = await firebase.firestore().collection("posts").orderBy('createdAt', 'desc').get();
    const posts = [];

    for (const doc of snapshot.docs) {
      const postData = { id: doc.id, ...doc.data() };
      const userSnapshot = await firebase.firestore().collection("users").doc(postData.uid).get();
      const userData = userSnapshot.data();
      
      const postWithUserData = { ...postData, creator: userData };
      
      posts.push(postWithUserData);
    }

    console.log(posts, 'ahsan');

    dispatch({
      type: "GET_POSTS",
      payload: posts,
    });
    dispatch(IsLoader(false));
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch(IsLoader(false));
  }
};


export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};
