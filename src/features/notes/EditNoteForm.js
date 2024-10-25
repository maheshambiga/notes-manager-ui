import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice';
import { useAuth } from '../../hooks/useAuth';

const EditNoteForm = props => {
  const { note, users } = props;

  const navigate = useNavigate();

  const { isAdmin, isManager } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const onFormSubmit = async evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const formValues = {
      id: note.id,
      title: formData.get('noteTitle'),
      text: formData.get('noteText'),
      userId: formData.get('assign-to'),
      completed: formData.get('noteCompleted') === 'on',
    };

    console.log(formValues);

    await updateNote(formValues);
  };

  const onDeleteUserHandler = async () => {
    await deleteNote({ id: note.id });
  };

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate('/dashboard/notes');
    }

    if (isError || isDelError) {
      console.error('Error occurred:', error || delerror);
    }
  }, [isSuccess, isDelSuccess, isError, isDelError, delerror, error, navigate]);

  return (
    <div>
      <h2 className="text-xl mb-8">New Note</h2>
      {error && <p className="my-4 text-red-400">{error?.data?.message}</p>}
      <form onSubmit={onFormSubmit}>
        <div className="mb-4 block">
          <label htmlFor="noteTitle">Title</label>
          <input
            id="noteTitle"
            name="noteTitle"
            className="border-solid border border-neutral-400 rounded-md block"
            defaultValue={note.title}
          />
        </div>
        <div className="mb-4 block">
          <label htmlFor="noteText">Text</label>
          <textarea
            id="noteText"
            name="noteText"
            className="border-solid border border-neutral-400 rounded-md block"
            rows={4}
            defaultValue={note.text}
          />
        </div>
        <div className="flex flex-row content-center gap-2 mb-4">
          <label htmlFor="noteCompleted">Completed: </label>
          <input
            type="checkbox"
            id="noteCompleted"
            name="noteCompleted"
            className="border-solid border border-neutral-400 rounded-md block"
            defaultChecked={note.completed}
          />
        </div>
        <div>
          <label name="assign-to">Assign To:</label>
          <select name="assign-to" id="assign-to" defaultValue={note.userId}>
            {users.map((user, id) => (
              <option key={`user-${id}`} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button
          className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
          type="submit"
        >
          Update
        </button>
      </form>
      {isAdmin && isManager && (
        <div className="flex gap-2">
          <button
            className="border-solid border border-neutral-400 rounded-md px-3 py-2 block mt-4"
            onClick={onDeleteUserHandler}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EditNoteForm;
