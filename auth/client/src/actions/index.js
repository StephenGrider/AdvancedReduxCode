import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => authUser(dispatch, response))
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => authUser(dispatch, response))
      .catch(response => dispatch(authError(response.data.error)));
  }
}


//refactoring actions optimization, external from (signinUser e signupUser)
export function authUser(dispatch, response) {
    // If request is good...
    // - Update state to indicate user is authenticated
    dispatch({ type: AUTH_USER });
    // - Save the JWT token
    localStorage.setItem('token', response.data.token); // localStorage is a Web API (DOM) we just set a name and pass the token 
    // - redirect to the route '/feature'
    browserHistory.push('/feature');
}

export function authError(error) { //this action is external from (signinUser e signupUser) coz it's easier to share with these 2 (so no repeat)
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
