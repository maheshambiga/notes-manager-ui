import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectNotesById } from './notesApiSlice';
import { selectAllUsers } from './../users/usersApiSlice';
import EditNoteForm from './EditNoteForm';
import { useGetNotesQuery } from './notesApiSlice';
import { useGetUsersQuery } from './../users/usersApiSlice';
import { useAuth } from './../../hooks/useAuth';

const EditNote = () => {
  const { id } = useParams();

  const { isAdmin, isManager, username } = useAuth();

  // const note = useSelector(state => selectNotesById(state, id));

  //const users = useSelector(selectAllUsers);

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => {
      return {
        note: data?.entities[id],
      };
    },
  });

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => {
      return {
        users: data?.ids?.map(id => data?.entities[id]),
      };
    },
  });

  if (!isManager || !isAdmin) {
    if (note.username !== username) {
      return <p>No Access</p>;
    }
  }

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};

export default EditNote;
