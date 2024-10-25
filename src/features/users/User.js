import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserById, useGetUsersQuery } from './usersApiSlice';

const User = props => {
  const { userId } = props;

  // const user = useSelector(state => selectUserById(state, userId));

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => {
      return {
        user: data?.entities[userId],
      };
    },
  });

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dashboard/users/${userId}`);

    const userRolesStr = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = user.active
      ? 'border border-slate-300 dark:border-slate-700 p-4 text-slate-800 dark:text-slate-700'
      : 'border border-slate-300 dark:border-slate-700 p-4 text-slate-800 dark:text-slate-700 text-yellow-700';

    return (
      <tr>
        <td className={`${cellStatus}`}>{user.username}</td>
        <td className={`${cellStatus}`}>{userRolesStr}</td>
        <td className={`${cellStatus}`}>
          <button className="" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default User;
