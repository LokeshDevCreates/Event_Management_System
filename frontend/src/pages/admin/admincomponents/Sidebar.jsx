import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Bell, Settings } from 'lucide-react';

const Sidebar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, path: '/admin-dashboard' },
    { name: 'Events', icon: <Calendar size={20} />, path: '/admin-dashboard/events' },
    { name: 'Organizers', icon: <Users size={20} />, path: '/admin-dashboard/organizers' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/admin-dashboard/notifications' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin-dashboard/settings' },
  ];

  return (
    <div className="flex flex-col w-64 h-full bg-gray-800 text-gray-200 shadow-lg">
      <div className="flex items-center justify-center h-24 bg-gray-900 shadow">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="flex-grow p-6">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-5">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive && (item.path === '/admin-dashboard' ? pathname === '/admin-dashboard' : true)
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="flex items-center justify-center h-16 bg-gray-900 text-gray-400">
        <p>© 2025 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Sidebar;
