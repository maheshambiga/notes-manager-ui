import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './../features/auth/authSlice';

export const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isManager = false;

  let isAdmin = false;

  let status = 'Employee';

  if (token) {
    const decoded = jwtDecode(token);

    const { username, roles } = decoded.user;

    isManager = roles.includes('Manager');

    isAdmin = roles.includes('Admin');

    if (isManager) status = 'Manager';

    if (isAdmin) status = 'Admin';

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: '', roles: [], isManager, isAdmin };
};
