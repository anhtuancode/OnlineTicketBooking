import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const NavbarAdmin = ({ toggleSidebar }) => {
  return (
    <header className="bg-black text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar} className="md:hidden">
            <span className="material-icons">menu</span>
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <Bell className="h-6 w-6" />
          <User className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
