import firebase from "../../config/firebase";

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(IsLoader(true));
    const snapshot = await firebase.firestore().collection("users").get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    dispatch({
      type: "GET_ALL_USERS",
      payload: users,
    });
    dispatch(IsLoader(false));
  } catch (error) {
    console.error("Error fetching all users:", error);
    dispatch(IsLoader(false));
  }
};

export const IsLoader = (val) => async (dispatch) => {
  dispatch({
    type: "SET_IS_LOADING",
    payload: val,
  });
};
