import React from 'react';
import { Link } from 'react-router-dom';
import CurrentTime from './CurrentTime';
import { useAuth } from './../../hooks/useAuth';

const Welcome = () => {
  const { username, status, isManager, isAdmin } = useAuth();

  const content = (
    <section className="welcome">
      <CurrentTime />
      <h2 className="text-xl mb-3">
        Welcome, <span className="font-bold">{username}</span>
      </h2>
      <p>
        <Link className="text-blue-600 underline" to="/dashboard/notes">
          View Notes
        </Link>
      </p>
      <p>
        <Link className="text-blue-600 underline" to="/dashboard/notes/new">
          Add New Note
        </Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link className="text-blue-600 underline" to="/dashboard/users">
            View User Settings
          </Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link className="text-blue-600 underline" to="/dashboard/users/new">
            Add New User
          </Link>
        </p>
      )}
    </section>
  );

  return content;
};

export default Welcome;
