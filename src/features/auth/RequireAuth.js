import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRefreshMutation } from './authApiSlice';

export const RequireAuth = ({ allowedRoles = [] }) => {
  const location = useLocation();

  const { roles } = useAuth();

  const [, { isUninitialized }] = useRefreshMutation();

  const allowedRole = roles.some(role => allowedRoles.includes(role));

  const content = allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
