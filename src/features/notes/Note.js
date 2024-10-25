import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectNotesById, useGetNotesQuery } from './notesApiSlice';

const Note = props => {
  const { noteId } = props;

  // const note = useSelector(state => selectNotesById(state, noteId));

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => {
      return {
        note: data?.entities[noteId],
      };
    },
  });

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const updated = new Date(note.createdAt).toLocaleString('en-US', {
      day: 'numeric',
      month: 'long',
    });

    const handleEdit = () => navigate(`/dashboard/notes/${noteId}`);

    const cellClassName =
      'border border-slate-300 dark:border-slate-700 p-4 text-slate-800 dark:text-slate-700';

    return (
      <tr className="">
        <td className={cellClassName}>
          {note.completed ? (
            <span className="text-green-500">Completed</span>
          ) : (
            <span className="text-red-600">Open</span>
          )}
        </td>
        <td className={cellClassName}>{created}</td>
        <td className={cellClassName}>{updated}</td>
        <td className={cellClassName}>{note.title}</td>
        <td className={cellClassName}>{note.username}</td>
        <td className={cellClassName}>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default Note;
