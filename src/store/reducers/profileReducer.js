const initialState = {
    user: null,
    posts: null,
    error: null,
    isLoading: false,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_MY_POSTS":
        return {
          ...state,
          posts: action.payload,
        };
  
        case "GET_USER":
            return {
              ...state,
              user: action.payload,
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
  
  export default profileReducer;
  