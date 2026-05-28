import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Newspaper, FileText,
  Mail, MessageSquare, BarChart2, LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/auth';

const NAV_GROUPS = [
  {
    label: null,
    items: [{ to: '/', icon: LayoutDashboard, label: 'Dashboard' }],
  },
  {
    label: 'Contenu',
    items: [
      { to: '/actualites', icon: Newspaper,  label: 'Actualités' },
      { to: '/documents',  icon: FileText,   label: 'Documents'  },
    ],
  },
  {
    label: 'Communication',
    items: [
      { to: '/newsletter', icon: Mail,           label: 'Newsletter' },
      { to: '/contacts',   icon: MessageSquare,  label: 'Contacts'   },
    ],
  },
  {
    label: 'Données',
    items: [{ to: '/analytics', icon: BarChart2, label: 'Analytiques' }],
  },
];

export default function Sidebar() {
  const { admin, logout } = useAuthStore();
  const navigate = useNavigate();

  const initials = admin?.nom
    ? admin.nom.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AD';

  return (
    <aside
      className="fixed top-0 left-0 flex flex-col bg-card border-r border-border"
      style={{ width: 'var(--sidebar-w)', minHeight: '100vh' }}
    >
      {/* Flag rule at top */}
      <div className="flag-rule" />

      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <p className="font-display text-lg font-bold text-ink tracking-tight">IE Cameroun</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
          Administration
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV_GROUPS.map(group => (
          <div key={group.label ?? 'root'} className="mb-4">
            {group.label && (
              <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-muted-foreground/60 px-3 mb-1">
                {group.label}
              </p>
            )}
            {group.items.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-md mb-0.5 text-sm
                  transition-smooth no-underline font-medium
                  ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}
                `}
              >
                <Icon size={15} />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Admin info */}
      <div className="px-3 pb-4 border-t border-border pt-4">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-secondary mb-1">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
            {initials}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-ink truncate">{admin?.nom || 'Administrateur'}</p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {admin?.role}
            </p>
          </div>
        </div>

        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-crimson hover:bg-crimson/5 transition-smooth"
        >
          <LogOut size={14} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
