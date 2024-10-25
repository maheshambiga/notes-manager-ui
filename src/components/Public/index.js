import React from 'react';
import { Link } from 'react-router-dom';

const Public = () => {
  return (
    <section className="public">
      <header className="border-b border-solid border-b-gray-200">
        <h1 className="text-2xl m-2">Welcome to note organizer app</h1>
      </header>
      <main className="public__main">Content Placeholder</main>
      <footer className="mx-2 absolute bottom-0 border-t border-solid border-t-gray-200 flex">
        <Link to="/login">Employee Login</Link>
      </footer>
    </section>
  );
};

export default Public;
