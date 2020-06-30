const initialState = {
  contacts: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
}
