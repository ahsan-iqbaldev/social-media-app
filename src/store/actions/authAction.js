import { toast } from "react-toastify";
import firebase from "../../config/firebase";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  console.log(color, "colorAhsan");
  return color;
};

const generateDefaultImageUrl = (name) => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  const avatarStyles = {
    "background-color": getRandomColor(),
    color: "#ffffff",
    "font-size": "28px",
    width: "100px",
    height: "100px",
    "border-radius": "50%",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "font-family": "'Baloo Bhai 2', cursive",
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100%" height="100%" rx="50%" fill="${avatarStyles["background-color"]}"/>
      <text x="50%" y="50%" font-size="${avatarStyles["font-size"]}" fill="${avatarStyles["color"]}" text-anchor="middle" dominant-baseline="central">
        ${initials}
      </text>
    </svg>
  `;

  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
};

export const signUpUser =
  (name, username, email, password) => async (dispatch) => {
    try {
      dispatch(IsLoader(true));
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      const bio = `
      🌿 Capturing the essence of nature through my lens
      ✨ "In every walk with nature, one receives far more than he seeks." - brian-ahsan
    `;

      const storeData = { name, username, email, createdAt,bio };

      const defaultImageUrl = generateDefaultImageUrl(name);
      storeData.profileImage = defaultImageUrl;

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
