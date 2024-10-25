import React from 'react';
import User from './User';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, selectUserById } from './usersApiSlice';

const UsersList = () => {
  const {
    data: users,
    isSuccess,
    isLoading,
    error,
    isError,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids?.map(userId => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="border-collapse border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Username
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Roles
            </th>
            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default UsersList;
