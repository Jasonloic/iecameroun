import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../api/client';
import { useAuthStore } from '../store/auth';
import { Admin } from '../types';
import { inputCls } from '../components/ui';

export default function Login() {
  const [email, setEmail]           = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading]       = useState(false);
  const { setAuth } = useAuthStore();
  const navigate    = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res                         = await authApi.login(email, motDePasse);
      const { token, admin } = res.data.data as { token: string; admin: Admin };
      setAuth(token, admin);
      navigate('/');
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || 'Identifiants incorrects'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">

      {/* Gauche — branding */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between border-r border-border px-12 py-14 bg-secondary/40">
        <div>
          <div className="flag-rule w-16 mb-6" />
          <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-muted-foreground">
            Intelligence Économique · 237
          </p>
        </div>

        <div>
          <h1 className="font-display text-5xl font-bold text-ink leading-[1.1] tracking-tight">
            Panneau<br />
            d'<span className="text-gold">administration</span>
          </h1>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Interface de gestion sécurisée. Accès réservé aux membres accrédités.
          </p>

          {/* Drapeau décoratif */}
          <div className="mt-12 flex gap-1">
            <div className="w-6 h-14 rounded-sm bg-forest" />
            <div className="w-6 h-14 rounded-sm bg-crimson" />
            <div className="w-6 h-14 rounded-sm bg-gold" />
          </div>
        </div>

        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} IE Cameroun — Accès restreint
        </p>
      </div>

      {/* Droite — formulaire */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm animate-fade-up">

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-gold mb-2">
              Authentification
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink tracking-tight">
              Connexion
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-1.5">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@iecameroun.cm"
                autoComplete="email"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.2em] font-medium text-muted-foreground mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={motDePasse}
                onChange={e => setMotDePasse(e.target.value)}
                required
                placeholder="••••••••"
                autoComplete="current-password"
                className={inputCls}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 rounded-md font-semibold text-sm tracking-wide transition-smooth
                ${loading
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-accent'}
              `}
            >
              {loading ? 'Vérification…' : 'Accéder au panneau'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
