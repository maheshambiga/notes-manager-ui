import { Outlet } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from './authApiSlice';
import { usePersist } from './../../hooks/usePersistToken';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { Link } from 'react-router-dom';

const PersistLogin = () => {
  const [persist] = usePersist(false);

  const token = useSelector(selectCurrentToken);

  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, err, isError }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();

          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (!persist) {
    console.log('No persist');

    content = <Outlet />;
  } else if (isLoading) {
    console.log('Loading');

    content = <p>Loading...</p>;
  } else if (isError) {
    console.log('Error');

    content = (
      <p>
        <span>{err?.data?.message}</span>
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log('Success');

    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('Token and Uninitialized');

    content = <Outlet />;
  } else {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
