import { toast } from "react-toastify";
import firebase from "../../config/firebase";

export const signUpUser =
  (name, username, email, password) => async (dispatch) => {
    try {
      dispatch(IsLoader(true));
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();

      const storeData = { name, username, email, createdAt };

      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(storeData);

      dispatch({ type: "REGISTER_SUCCESS" });
      dispatch(IsLoader(false));
    } catch (error) {
      dispatch({ type: "REGISTER_FAIL", payload: error.message });
      dispatch(IsLoader(false));
    }
  };

export const signInUser = (email, password) => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const { user } = userCredential;

    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get();

    const userData = userDoc.data();

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { ...userData, userId: user.uid },
    });
    dispatch(IsLoader(false));
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
    dispatch(IsLoader(false));
    toast.error("Login Failed. Check your email and password.");
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADINGS",
    payload: val,
  });
};
