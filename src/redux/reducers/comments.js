const initialState = {
    comments: []
  };
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case "COMMENT:ADD_COMMENTS":
        return {
          ...state,
          comments: payload,
        }; 
        default:
            return state;
    }
  }