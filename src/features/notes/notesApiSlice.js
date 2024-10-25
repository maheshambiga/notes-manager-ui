import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from './../../store/api/apiSlice';

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => {
    return {
      getNotes: builder.query({
        query: () => ({
          url: '/notes',
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError;
          },
        }),
        transformResponse: responseData => {
          const loadedNotes = responseData.map(notes => {
            notes.id = notes._id;
            return notes;
          });
          return notesAdapter.setAll(initialState, loadedNotes);
        },
        providesTags: (result, error, arg) => {
          if (result?.ids) {
            return [
              { type: 'Note', id: 'LIST' },
              ...result.ids.map(id => ({ type: 'Note', id })),
            ];
          } else return [{ type: 'Note', id: 'LIST' }];
        },
      }),
      addNewNote: builder.mutation({
        query: initialUserData => ({
          url: '/notes',
          method: 'POST',
          body: {
            ...initialUserData,
          },
        }),
        invalidatesTags: [{ type: 'Note', id: 'LIST' }],
      }),
      updateNote: builder.mutation({
        query: initialUserData => ({
          url: '/notes',
          method: 'PATCH',
          body: {
            ...initialUserData,
          },
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Note', id: arg.id }];
        },
      }),
      deleteNote: builder.mutation({
        query: ({ id }) => ({
          url: '/notes',
          method: 'DELETE',
          body: {
            id,
          },
        }),
        invalidatesTags: (result, error, arg) => {
          return [{ type: 'Note', id: arg.id }];
        },
      }),
    };
  },
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

export const selectedNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectedNotesData = createSelector(selectedNotesResult, notesResult => {
  return notesResult.data;
});

export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
  selectIds: selectNotesIds,
} = notesAdapter.getSelectors(
  state => selectedNotesData(state) ?? initialState
);
