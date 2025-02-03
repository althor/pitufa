const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  };
  
  function authReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          user: action.payload, 
          isAuthenticated: true, 
          loading: false 
        };
      case LOGIN_FAILURE:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      case LOGOUT_SUCCESS:
        return initialState;
      default:
        return state;
    }
  }
  
  export default rootSaga;