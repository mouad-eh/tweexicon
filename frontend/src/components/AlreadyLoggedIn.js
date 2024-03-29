import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { HOME_PATH } from '../utils/constants';

export default function AlreadyLoggedIn(props) {
  const { children } = props;
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  useEffect(() => {
    if (isLoggedIn) {
      navigate(HOME_PATH);
    }
  });
  return !isLoggedIn ? children : null;
}
