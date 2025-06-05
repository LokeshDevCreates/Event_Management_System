import { Outlet } from 'react-router-dom';
import Sidebar from '../admincomponents/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-700">Event Booking Management System</h1>
        </header>

        <main className="flex-1 p-6">
          {/* Render nested routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
