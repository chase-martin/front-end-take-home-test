export default (state, action) => {
  switch (action.type) {
    case "UPDATE_SEARCH":
      return {
        ...state,
        customer: action.payload
      };
      
    case "RESET_SEARCH":
      return {
        ...state,
        customer: null
      };

    default:
      return state;
  }
};