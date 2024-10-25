import React, { useEffect } from 'react';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogoutMutation } from './../../features/auth/authApiSlice';
import { useAuth } from './../../hooks/useAuth';

import './styles.scss';

const DashFooter = () => {
  const { username, status } = useAuth();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [logout, { isSuccess, error }] = useLogoutMutation();

  const onGoHomeClicked = () => {
    navigate('/dashboard');
  };

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    if (isSuccess) navigate('/login');
  }, [isSuccess, navigate]);

  let goHomeButton = null;

  if (pathname !== '/dashboard') {
    goHomeButton = (
      <div className="mr-4">
        <button
          title="Home"
          className="dash-footer__button icon-button"
          onClick={onGoHomeClicked}
        >
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        </button>
      </div>
    );
  }

  const content = (
    <footer className="dash-footer absolute bottom-0 border-t border-solid border-t-gray-200 flex p-2">
      {goHomeButton}
      <div className="dash-footer__container  flex gap-x-3">
        <p>Current User: {username}</p>
        <p>Status: {status}</p>
      </div>
      <div className="ml-auto">
        <button onClick={logoutHandler} className="underline">
          Logout
        </button>
      </div>
    </footer>
  );
  return content;
};

export default DashFooter;
