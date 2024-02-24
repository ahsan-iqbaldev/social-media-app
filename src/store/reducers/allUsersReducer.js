const initialState = {
    users: null,
    error: null,
    isLoading: false,
  };
  
  const allUsers = (state = initialState, action) => {
    switch (action.type) {
      case "GET_ALL_USERS":
        return {
          ...state,
          users: action.payload,
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
  
  export default allUsers;
  