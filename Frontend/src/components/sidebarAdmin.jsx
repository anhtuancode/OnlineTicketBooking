import React from 'react';
import { Home, Users, FileText, BarChart3, Settings, X , Clapperboard} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Home, label: 'Dashboard', to: '/admin', active: true },
  { icon: Users, label: 'Người dùng', to: '/admin/user', active: false },
  { icon: Clapperboard, label: 'Phim & Sự kiện', to: '/admin', active: false },
  { icon: BarChart3, label: 'Thống kê', to: '/admin', active: false },
  { icon: Settings, label: 'Cài đặt', to: '/admin', active: false },
];

const SidebarAdmin = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  return (
    <aside
      className={`bg-black text-white w-64 min-h-screen transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out fixed md:static z-30`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-white text-black' : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
