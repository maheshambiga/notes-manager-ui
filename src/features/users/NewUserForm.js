import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from './usersApiSlice';
import { ROLES } from './../../config/roles';

const userRegex = /^[A-z]{3,20}/;
const pwdRegex = /^[A-z0-9!@#$%]{4,12}/;

const NewUserForm = () => {
  const [isValidUserName, setValidUserName] = useState(true);

  const [isValidPassword, setValidPassword] = useState(true);

  const [selectedRoles, setValidRoles] = useState([]);

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const onUsernameInputHandler = evt => {
    const username = evt.target.value;

    setValidUserName(userRegex.test(username));
  };

  const onPasswordInputHandler = evt => {
    const password = evt.target.value;

    setValidPassword(pwdRegex.test(password));
  };

  const onSelectRoles = evt => {
    const values = Array.from(
      evt.target.selectedOptions, //HTMLCollection
      option => option.value
    );
    setValidRoles(values);
  };

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>
        {' '}
        {role}
      </option>
    );
  });

  const onFormSubmit = async evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    setValidUserName(formData.get('username'));

    setValidPassword(formData.get('password'));

    setValidRoles(formData.getAll('roles'));

    if (!isValidUserName || !isValidPassword || !selectedRoles.length === 0) {
      return;
    }

    const formValues = {
      username: formData.get('username'),
      password: formData.get('password'),
      roles: formData.getAll('roles'),
    };

    await addNewUser(formValues);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/users');
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <h2 className="text-xl mb-8">New User</h2>
      {error && <p className="my-4 text-red-400">{error?.data?.message}</p>}
      <form onSubmit={onFormSubmit}>
        <div className="">
          <label className="mb-2 block" htmlFor="username">
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className="border-solid border border-neutral-400 rounded-md block"
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            onChange={onUsernameInputHandler}
          />
          {!isValidUserName && <p className="text-red-400">Invalid username</p>}
          <label className="mb-2 mt-4 block" htmlFor="password">
            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className="border-solid border border-neutral-400 rounded-md block"
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            onChange={onPasswordInputHandler}
          />
          {!isValidPassword && <p className="text-red-400">Invalid password</p>}
        </div>
        <label className="mb-2 mt-4 block" htmlFor="roles">
          Role:
        </label>
        <select
          id="roles"
          name="roles"
          multiple={true}
          size="3"
          onChange={onSelectRoles}
        >
          {options}
        </select>
        {selectedRoles.length === 0 && (
          <p className="text-red-400">Select a role</p>
        )}
        <button
          className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
          type="submit"
          disabled={
            !(isValidUserName && isValidPassword && selectedRoles.length > 0)
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
