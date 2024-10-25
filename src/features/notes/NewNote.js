import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers, useGetUsersQuery } from './../users/usersApiSlice';
import NewNoteForm from './NewNoteForm';

const NewNote = () => {
  // const users = useSelector(selectAllUsers);

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => {
      return {
        users: data?.ids?.map(id => data?.entities),
      };
    },
  });

  if (!(users.length > 0)) {
    return <p>Not currently available!</p>;
  }

  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
};

export default NewNote;
