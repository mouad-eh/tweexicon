import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SIGNIN_PATH } from '../utils/constants';
import { isAuthenticated } from '../utils/helperFuncs';

export default function AuthProtected(props) {
  const { children } = props;
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  useEffect(() => {
    if (!isLoggedIn) navigate(SIGNIN_PATH);
  });
  return isLoggedIn ? children : null;
}
