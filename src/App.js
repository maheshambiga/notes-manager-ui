import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-wrapper font-sans">
      <Outlet />
    </div>
  );
}

export default App;
