import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { JWT_COOKIE } from './constants';

// the functions in this file represent an abstraction layer over auth token persistance in the browser
// it would be easier later to move to localStorage if necessary

export function setAuthToken(jwtToken) {
  const payload = jwt(jwtToken);
  Cookies.set(JWT_COOKIE, jwtToken, {
    path: '/',
    domain: process.env.REACT_APP_DOMAIN,
    expires: new Date(payload.exp * 1000),
  });
}

export function getAuthToken() {
  return Cookies.get(JWT_COOKIE);
}

export function deleteAuthToken() {
  const payload = jwt(getAuthToken());
  Cookies.remove(JWT_COOKIE, {
    path: '/',
    domain: process.env.REACT_APP_DOMAIN,
    expires: new Date(payload.exp * 1000),
  });
}

export function isAuthenticated() {
  const userToken = getAuthToken();
  return !(!userToken || userToken === 'undefined');
}
