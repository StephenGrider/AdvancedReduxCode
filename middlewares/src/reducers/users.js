import {
  FETCH_USERS
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [ ...state, ...action.payload.data ]; // spread operator combine the prev state with the new one (payload)
  }

  return state;
}
