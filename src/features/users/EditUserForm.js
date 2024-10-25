import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  selectUserById,
} from './usersApiSlice';
import { ROLES } from './../../config/roles';

const pwdRegex = /^[A-z0-9!@#$%]{4,12}/;

const EditUserForm = ({ user }) => {
  const [isValidPassword, setValidPassword] = useState(user.password);

  const [selectedRoles, setValidRoles] = useState(user.roles);

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

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

    // setValidPassword(formData.get('password'));

    // setValidRoles(formData.getAll('roles'));

    if (!isValidPassword || !selectedRoles || selectedRoles.length === 0) {
      return;
    }

    const formValues = {
      id: user.id,
      password: formData.get('password'),
      roles: formData.getAll('roles'),
      active: formData.get('active') === 'on',
    };

    console.log(formValues);

    await updateUser(formValues);
  };

  const onDeleteUserHandler = async () => {
    await deleteUser({ id: user.id });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate('/dashboard/users');
    }

    if (isError || isDelError) {
      console.error('Error occurred:', error || delerror);
    }
  }, [isSuccess, isDelSuccess, isError, isDelError, delerror, error, navigate]);

  return (
    <div>
      <h2 className="text-xl mb-8">Update User</h2>
      {(isError || isDelError) && (
        <p className="my-4 text-red-400">{error?.data?.message}</p>
      )}
      {error && <p className="my-4 text-red-400">{error?.data?.message}</p>}
      <form onSubmit={onFormSubmit}>
        <div className="">
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
        <div className="flex flex-row content-center gap-2">
          <label className="" htmlFor="password">
            Active:
          </label>
          <input type="checkbox" name="active" />
        </div>

        <button
          className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
          type="submit"
          disabled={!(isValidPassword && selectedRoles.length > 0)}
        >
          Update
        </button>
      </form>
      <div className="flex gap-2">
        <button
          className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
          onClick={onDeleteUserHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default EditUserForm;
