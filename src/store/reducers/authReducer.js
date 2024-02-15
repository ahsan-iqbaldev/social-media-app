const initialState = {
    uid: "",
    user: null,
    error: null,
    isLoading: false, 
  };

  const authReducer = (state = initialState, action) => {
    switch (action.type) {

      case "REGISTER_SUCCESS":
      return{
        ...state,
      }

      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
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
  