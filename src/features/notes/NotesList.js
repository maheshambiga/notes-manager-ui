import React from 'react';
import { useGetNotesQuery } from './notesApiSlice';
import Note from './Note';
import { useAuth } from '../../hooks/useAuth';

const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();

  const {
    data: users,
    isSuccess,
    isLoading,
    error,
    isError,
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15 * 1000, // refetch for every time interval
    refetchOnFocus: true, // on focusing the current tab
    refetchOnMountOrArgChange: true, // on component remount
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users;

    // filter data
    let filteredData = null;

    if (isManager || isAdmin) {
      filteredData = [...ids];
    } else {
      filteredData = ids.filter(
        noteId => entities[noteId].username === username
      );
    }

    const tableContent = ids?.length
      ? filteredData?.map(noteId => <Note key={noteId} noteId={noteId} />)
      : null;

    content = (
      <table className="border-collapse border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="w-auto border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Status
            </th>
            <th className="w-1/2 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Created
            </th>
            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Updated
            </th>
            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Title
            </th>
            <th className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
              Owner
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

export default NotesList;
