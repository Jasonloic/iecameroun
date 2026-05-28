import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth';
import { authApi } from './api/client';

import Layout    from './components/Layout';
import Login     from './pages/Login';
import Dashboard from './pages/Dashboard';
import Actualites from './pages/Actualites';
import Documents  from './pages/Documents';
import Newsletter from './pages/Newsletter';
import Contacts   from './pages/Contacts';
import Analytics  from './pages/Analytics';
import { Admin }  from './types';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { token, setAdmin } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      authApi.me()
        .then(r => setAdmin(r.data.data as Admin))
        .catch(() => useAuthStore.getState().logout());
    }
  }, []);

  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();
  return token ? <Navigate to="/" replace /> : <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(0 0% 100%)',
            color: 'hsl(35 41% 15%)',
            border: '1px solid hsl(30 15% 82%)',
            fontSize: 13,
            fontFamily: 'Montserrat, system-ui, sans-serif',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 16px hsla(30,19%,15%,0.08)',
          },
          success: { iconTheme: { primary: 'hsl(145, 20%, 30%)', secondary: '#fff' } },
          error:   { iconTheme: { primary: 'hsl(0, 35%, 40%)',   secondary: '#fff' } },
        }}
      />

      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route
          path="/"
          element={<AuthGuard><Layout /></AuthGuard>}
        >
          <Route index                element={<Dashboard />} />
          <Route path="actualites"   element={<Actualites />} />
          <Route path="documents"    element={<Documents />} />
          <Route path="newsletter"   element={<Newsletter />} />
          <Route path="contacts"     element={<Contacts />} />
          <Route path="analytics"    element={<Analytics />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
