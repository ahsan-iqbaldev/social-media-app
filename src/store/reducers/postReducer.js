import "react-toastify/dist/ReactToastify.css";

const initialState = {
  posts: null,
  error: null,
  isLoading: false,
  singlePost: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

      case "GET_SINGLE_POST":
        return {
          ...state,
          singlePost: action.payload,
        };

    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
