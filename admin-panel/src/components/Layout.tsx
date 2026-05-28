import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 px-10 py-10" style={{ marginLeft: 'var(--sidebar-w)' }}>
        <Outlet />
      </main>
    </div>
  );
}
