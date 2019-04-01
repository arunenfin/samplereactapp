import { SET_STATE, RESET_STATE } from './constants';

const INITIAL_STATE = {
  user: {},
  users: [],
  isLoggedIn: false
};

function reducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_STATE:
      return { ...state, ...action.value };
    case RESET_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
}

export default reducer;