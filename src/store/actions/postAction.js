import firebase from "../../config/firebase";

export const addPost = (formData) => async (dispatch) => {
  try {
    console.log(formData, formData);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`Posts/${formData.post.name}`);
    await imageRef.put(formData.post);

    const imageUrl = await imageRef.getDownloadURL();
    console.log(imageUrl, "imageUrl");

    let uid = 767676677;

    const postData = {
      uid: uid,
      caption: formData?.caption,
      location: formData?.location,
      tags: formData?.tags,
      postUrl: imageUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    console.log(postData)

    await firebase.firestore().collection("posts").add(postData);
  } catch (error) {
    console.log(error);
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADINGS",
    payload: val,
  });
};
