import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from './../../store/index';
import { usersApiSlice } from './../../features/users/usersApiSlice';
import { notesApiSlice } from './../../features/notes/notesApiSlice';

const Prefetch = () => {
  useEffect(() => {
    /*  const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()); */

    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );

    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    );
  }, []);
  return <Outlet />;
};

export default Prefetch;
