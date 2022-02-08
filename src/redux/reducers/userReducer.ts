const initialState = {
  users: [],
};

// eslint-disable-next-line default-param-last
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        users: state.users.concat(action.payload),
      };
    case 'EDIT':
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }

          return user;
        }),
      };
    case 'REMOVE':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export default userReducer;
