import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewNoteMutation } from './notesApiSlice';

const NewNoteForm = props => {
  const { note, users } = props;

  const navigate = useNavigate();

  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const onFormSubmit = async evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    const formValues = {
      title: formData.get('noteTitle'),
      text: formData.get('noteText'),
      userId: formData.get('assign-to'),
    };

    console.log(formValues);

    await addNewNote(formValues);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/dashboard/notes');
    }
  }, [isSuccess, navigate]);

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
          />
        </div>
        <div className="mb-4 block">
          <label htmlFor="noteText">Text</label>
          <textarea
            id="noteText"
            name="noteText"
            className="border-solid border border-neutral-400 rounded-md block"
            rows={4}
          />
        </div>
        <div>
          <label name="assign-to">Assign To:</label>
          <select name="assign-to" id="assign-to">
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
          Add
        </button>
      </form>
    </div>
  );
};

export default NewNoteForm;
