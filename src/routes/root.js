import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from './../App';
import ErrorPage from './../features/error/error-page';
import Layout from './../components/Layout';
import Public from './../components/Public';
import Login from './../features/auth/Login';
import DashLayout from './../components/DashLayout';
import Welcome from './../features/auth/Welcome';
import UsersList from './../features/users/UsersList';
import EditUser from './../features/users/EditUser';
import NewUserForm from './../features/users/NewUserForm';
import NotesList from './../features/notes/NotesList';
import EditNote from './../features/notes/EditNote';
import NewNote from './../features/notes/NewNote';
import Prefetch from './../features/auth/PreFetch';
import PersistLogin from '../features/auth/PersistLogin';
import { RequireAuth } from '../features/auth/RequireAuth';

import { ROLES } from './../config/roles';

const rootRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}>
        <Route element={<Layout />}>
          <Route element={<Public />} index />
          <Route path="/login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={Object.values(ROLES)} />}
            >
              <Route element={<Prefetch />}>
                <Route path="/dashboard" element={<DashLayout />}>
                  <Route element={<Welcome />} index />
                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    <Route path="users">
                      <Route element={<UsersList />} index />
                      <Route path="new" element={<NewUserForm />} />
                      <Route path=":id" element={<EditUser />} />
                    </Route>
                  </Route>
                  <Route path="notes">
                    <Route element={<NotesList />} index />
                    <Route path="new" element={<NewNote />} />
                    <Route path=":id" element={<EditNote />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

/* const rootRoute = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Public />,
            },
            {
              path: '/login',
              element: <Login />,
            },
            {
              element: <PersistLogin />,
              children: [
                {
                  element: <RequireAuth allowedRoles={Object.values(ROLES)} />,
                  children: [
                    {
                      element: <Prefetch />,
                      children: [
                        {
                          path: '/dashboard',
                          element: <DashLayout />,
                          children: [
                            {
                              index: true,
                              element: <Welcome />,
                            },
                            {
                              path: 'users',
                              children: [
                                {
                                  index: true,
                                  element: <UsersList />,
                                },
                                {
                                  path: ':id',
                                  element: <EditUser />,
                                },
                                {
                                  path: 'new',
                                  element: <NewUserForm />,
                                },
                              ],
                            },
                            {
                              path: 'notes',
                              children: [
                                {
                                  index: true,
                                  element: <NotesList />,
                                },
                                {
                                  path: ':id',
                                  element: <EditNote />,
                                },
                                {
                                  path: 'new',
                                  element: <NewNote />,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ]);*/

export default rootRoute;
