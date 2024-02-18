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
    const snapshot = await firebase.firestore().collection("posts").orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(posts,'ahsan')
    dispatch({
      type: "GET_POSTS",
      payload: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING_CREATE",
    payload: val,
  });
};
