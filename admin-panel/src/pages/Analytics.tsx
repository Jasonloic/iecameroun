import { useEffect, useState } from 'react';
import { analyticsApi } from '../api/client';
import { ZoneVisite, PagePopulaire, VisiteTempo, DashboardStats } from '../types';
import { PageHeader, Card, SectionLabel, StatCard, FilterPill } from '../components/ui';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const PERIODES = [7, 14, 30, 90] as const;

export default function Analytics() {
  const [stats,   setStats]   = useState<DashboardStats | null>(null);
  const [visites, setVisites] = useState<VisiteTempo[]>([]);
  const [zones,   setZones]   = useState<ZoneVisite[]>([]);
  const [pages,   setPages]   = useState<PagePopulaire[]>([]);
  const [periode, setPeriode] = useState<typeof PERIODES[number]>(30);

  useEffect(() => {
    analyticsApi.dashboard().then(r => setStats(r.data.data));
    analyticsApi.zones().then(r => setZones(r.data.data));
    analyticsApi.pages().then(r => setPages(r.data.data.slice(0, 10)));
  }, []);

  useEffect(() => {
    analyticsApi.temps(periode).then(r => setVisites(r.data.data));
  }, [periode]);

  const tooltip = {
    contentStyle: {
      background: 'hsl(0 0% 100%)',
      border: '1px solid hsl(30 15% 82%)',
      borderRadius: '0.5rem',
      fontSize: 12,
      color: 'hsl(30 19% 15%)',
    },
    labelStyle: { color: 'hsl(30 10% 45%)' },
  };

  const gold   = 'hsl(35, 41%, 47%)';
  const forest = 'hsl(145, 20%, 30%)';
  const muted  = 'hsl(53, 47%, 86%)';

  return (
    <div className="animate-fade-up">
      <PageHeader label="Données · Analytiques" title="Analytiques" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard label="Visiteurs totaux"    value={stats?.visiteurs.total ?? '—'} gold />
        <StatCard label="Ce mois-ci"          value={stats?.visiteurs.derniers30Jours ?? '—'} sub="visiteurs uniques" />
        <StatCard label="Vues cumulées"       value={stats?.vues ?? '—'} />
      </div>

      {/* Courbe temporelle */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <SectionLabel>Visites dans le temps</SectionLabel>
          <div className="flex gap-1.5">
            {PERIODES.map(p => (
              <FilterPill
                key={p}
                label={`${p}j`}
                active={periode === p}
                onClick={() => setPeriode(p)}
              />
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={visites} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={gold} stopOpacity={0.15} />
                <stop offset="100%" stopColor={gold} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip {...tooltip} />
            <Area type="monotone" dataKey="vues" stroke={gold} strokeWidth={2} fill="url(#gv)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Zones */}
        <Card className="p-6">
          <SectionLabel>Visiteurs par pays</SectionLabel>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={zones.slice(0, 8)} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="pays" tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltip} />
              <Bar dataKey="nbVisiteurs" radius={[3, 3, 0, 0]}>
                {zones.slice(0, 8).map((_, i) => (
                  <Cell key={i} fill={i === 0 ? gold : i === 1 ? forest : muted} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pages populaires */}
        <Card className="p-6">
          <SectionLabel>Pages les plus visitées</SectionLabel>
          <div>
            {pages.map((p, i) => (
              <div
                key={p.path}
                className={`flex items-center justify-between py-2.5 ${i < pages.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`
                    w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0
                    ${i === 0 ? 'bg-gold/15 text-gold' : 'bg-secondary text-muted-foreground'}
                  `}>
                    {i + 1}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">{p.path}</span>
                </div>
                <span className={`font-display font-bold text-sm ml-4 flex-shrink-0 ${i === 0 ? 'text-gold' : 'text-ink'}`}>
                  {p.vues.toLocaleString()}
                </span>
              </div>
            ))}
            {pages.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">Aucune donnée</p>
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
