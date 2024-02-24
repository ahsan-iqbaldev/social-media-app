const initialState = {
  posts: null,
  error: null,
  isLoading: false,
};

const savedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SAVED_POSTS":
      return {
        ...state,
        posts: action.payload,
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

export default savedReducer;
