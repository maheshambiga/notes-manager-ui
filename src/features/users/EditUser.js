import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserById, useGetUsersQuery } from './usersApiSlice';
import EditUserForm from './EditUserForm';

const EditUser = () => {
  const { id } = useParams();

  /*   const user = useSelector(state => {
    return selectUserById(state, id);
  }); */

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => {
      return {
        user: data?.enities[id],
      };
    },
  });

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;

  return content;
};

export default EditUser;
