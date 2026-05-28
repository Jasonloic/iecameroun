import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

// ── Section label — même style que la Bibliothèque ───────────────────────────
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-muted-foreground mb-4">
      {children}
    </p>
  );
}

// ── Page header ───────────────────────────────────────────────────────────────
export function PageHeader({
  label, title, action,
}: {
  label: string; title: string; action?: ReactNode;
}) {
  return (
    <div className="border-b border-border pb-8 mb-10 flex items-end justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-gold mb-3">
          {label}
        </p>
        <h1 className="font-display text-4xl font-semibold text-ink leading-tight tracking-tight">
          {title}
        </h1>
      </div>
      {action}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
export function StatCard({
  label, value, sub, gold,
}: {
  label: string; value: string | number; sub?: string; gold?: boolean;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card-soft">
      <p className="text-[10px] uppercase tracking-[0.25em] font-medium text-muted-foreground mb-3">
        {label}
      </p>
      <p className={`font-display text-4xl font-bold leading-none mb-2 ${gold ? 'text-gold' : 'text-ink'}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'gold';

const BADGE: Record<BadgeVariant, string> = {
  success: 'bg-forest/10 text-forest border border-forest/20',
  warning: 'bg-gold/10 text-gold border border-gold/20',
  danger:  'bg-crimson/10 text-crimson border border-crimson/20',
  info:    'bg-primary/10 text-primary border border-primary/20',
  gold:    'bg-gold/15 text-gold border border-gold/30',
  neutral: 'bg-muted text-muted-foreground border border-border',
};

export function Badge({ label, variant = 'neutral' }: { label: string; variant?: BadgeVariant }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-medium tracking-wide ${BADGE[variant]}`}>
      {label}
    </span>
  );
}

// ── Button ─────────────────────────────────────────────────────────────────────
type BtnVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

const BTN: Record<BtnVariant, string> = {
  primary:   'bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground border border-transparent',
  secondary: 'bg-background text-foreground border border-border hover:border-primary hover:text-primary',
  danger:    'bg-crimson/10 text-crimson border border-crimson/20 hover:bg-crimson/20',
  ghost:     'bg-transparent text-muted-foreground border border-transparent hover:text-foreground',
};

export function Btn({
  label, onClick, icon, variant = 'primary',
  type = 'button', disabled = false, size = 'md',
}: {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: BtnVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  size?: 'sm' | 'md';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 font-medium rounded-md transition-smooth
        ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'}
        ${BTN[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {icon}{label}
    </button>
  );
}

// ── Icon button ────────────────────────────────────────────────────────────────
export function IconBtn({
  icon, onClick, danger,
}: {
  icon: ReactNode; onClick: () => void; danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center p-1.5 rounded border transition-smooth
        ${danger
          ? 'border-border text-muted-foreground hover:border-crimson hover:text-crimson'
          : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}
      `}
    >
      {icon}
    </button>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  width?: string;
  align?: 'left' | 'right' | 'center';
}

export function Table<T>({
  columns, data, keyExtractor,
}: {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {columns.map(col => (
              <th
                key={col.key}
                className="px-5 py-3 text-left text-[10px] uppercase tracking-[0.25em] font-medium text-muted-foreground whitespace-nowrap"
                style={{ textAlign: col.align || 'left', width: col.width }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr
              key={keyExtractor(row)}
              className="border-b border-border hover:bg-secondary/50 transition-smooth"
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  className="px-5 py-3.5 text-sm text-muted-foreground"
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-16 text-center text-sm text-muted-foreground tracking-wide">
          Aucune donnée disponible
        </div>
      )}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
export function Pagination({
  page, total, onChange,
}: {
  page: number; total: number; onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-1 px-5 py-3 border-t border-border">
      {Array.from({ length: total }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`
            w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-smooth
            ${p === page
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-primary hover:bg-secondary border border-border'}
          `}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({
  title, onClose, children, width = 580,
}: {
  title: string; onClose: () => void; children: ReactNode; width?: number;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
      <div
          className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-50"
          onClick={onClose}
      >
        <div className="absolute inset-0 overflow-y-auto flex justify-center pt-24 pb-8">
          <div
              onClick={e => e.stopPropagation()}
              className="bg-card border border-border rounded-lg shadow-card-soft flex flex-col animate-fade-up h-fit"
              style={{ width, maxWidth: '92vw', maxHeight: '85vh' }}
          >
            <div className="flag-rule" />
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h2 className="font-display text-base font-semibold text-ink tracking-tight">
                {title}
              </h2>
              <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-smooth p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}

// ── Form field ─────────────────────────────────────────────────────────────────
export function Field({
  label, children, required,
}: {
  label: string; children: ReactNode; required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-1.5">
        {label}
        {required && <span className="text-crimson ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Input styles (className à appliquer sur input/textarea/select) ────────────
export const inputCls =
  'w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring transition-smooth';

// ── Card ───────────────────────────────────────────────────────────────────────
export function Card({
  children, className = '',
}: {
  children: ReactNode; className?: string;
}) {
  return (
    <div className={`bg-card border border-border rounded-lg shadow-card-soft ${className}`}>
      {children}
    </div>
  );
}

// ── Filter pill — même pattern que Bibliothèque ────────────────────────────────
export function FilterPill({
  label, active, onClick,
}: {
  label: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-md text-xs border transition-smooth font-medium
        ${active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-background text-muted-foreground border-border hover:border-gold hover:text-gold'}
      `}
    >
      {label}
    </button>
  );
}
