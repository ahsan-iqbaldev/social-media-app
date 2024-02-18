import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  uid: "",
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      toast.success("Registration successful!");
      return {
        ...state,
      };

    case "LOGIN_SUCCESS":
      toast.success("Login successful!");
      return {
        ...state,
        user: action.payload,
        uid: action.payload.userId
      };

    case "REGISTER_FAIL":
    case "LOGIN_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "SET_IS_LOADINGS":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
