import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { thunk } from "redux-thunk";
import CryptoJS from "crypto-js";

const saveToLocalStorage = (state) => {
  const serializedUid = CryptoJS.AES.encrypt(
    JSON.stringify(state.authUser),
    "my-secret-key"
  ).toString();
  localStorage.setItem("auth", serializedUid);
};

const checkLocalStorage = () => {
  try {
    const serializedUid = localStorage.getItem("auth");
    if (serializedUid === null) return undefined;

    const decryptedData = CryptoJS.AES.decrypt(
      serializedUid,
      "my-secret-key"
    ).toString(CryptoJS.enc.Utf8);

    return {
      authUser: JSON.parse(decryptedData),
    };
  } catch (error) {
    console.error(
      "Error while parsing or decrypting localStorage data:",
      error
    );
    return undefined; 
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  checkLocalStorage(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
