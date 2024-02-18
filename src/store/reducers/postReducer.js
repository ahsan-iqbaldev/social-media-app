import "react-toastify/dist/ReactToastify.css";

const initialState = {
  posts: null,
  error: null,
  isLoadingCreate: false,
  isPostLoading: false,
  isPostLoading: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };

    case "SET_IS_LOADING_CREATE":
      return {
        ...state,
        isLoadingCreate: action.payload,
      };

    default:
      return state;
  }
};

export default postReducer;
