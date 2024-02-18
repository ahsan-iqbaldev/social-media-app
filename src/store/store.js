import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { compose } from "redux";
import rootReducer from "./reducers/rootReducer";

const saveToLocalStorage = (state) => {
  const serializedUid = JSON.stringify(state.auth);
  localStorage.setItem("auth", serializedUid);
};
const checkLocalStorage = () => {
  const serializedUid = localStorage.getItem("auth");
  if (serializedUid === null) return undefined;
  return {
    auth: JSON.parse(serializedUid),
  };
};

const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(  
  rootReducer,
  checkLocalStorage(),
  comp(applyMiddleware(thunk))
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
