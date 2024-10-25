import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from './authApiSlice';
import { setCredentials } from './authSlice';
import { usePersist } from './../../hooks/usePersistToken';

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const [token, setToken] = usePersist(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFormSubmit = async evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const loginData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    // persist token
    setToken(formData.get('remember') === 'on');

    try {
      const { accessToken } = await login(loginData).unwrap();

      console.log(accessToken);

      dispatch(setCredentials({ accessToken }));

      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="border border-solid border-amber-800 rounded-md w-1/4 p-8">
        <h1 className="text-xl mb-8">Login</h1>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label htmlFor="username">Username</label>
            <input
              className="border-solid border border-neutral-400 rounded-md block w-full"
              id="username"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password">Username</label>
            <input
              className="border-solid border border-neutral-400 rounded-md block w-full"
              id="password"
              name="password"
              type="password"
            />
          </div>
          <div>
            <label htmlFor="remember" className="mr-2">
              Remember me
            </label>
            <input type="checkbox" id="remember" name="remember" />
          </div>
          <button
            className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
            type="submit"
          >
            Login
          </button>
          {error && <p className="my-4 text-red-400">{error?.data?.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
