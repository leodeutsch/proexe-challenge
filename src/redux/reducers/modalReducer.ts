const initialState = {
  editModal: false,
  deleteModal: false,
  user: {},
};

// eslint-disable-next-line default-param-last
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_EDIT':
      return {
        ...state,
        editModal: !state.editModal,
      };
    case 'SET_DELETE':
      return {
        ...state,
        deleteModal: !state.deleteModal,
      };
    default:
      return state;
  }
};
