import React from 'react';
import { Outlet } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const Layout = () => {
  return (
    <div>
      <header className="p-4 bg-gray-800 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">EduConnect</div>
        <LanguageSelector />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        © 2025 EduConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
