import { useEffect, useState } from 'react';
import { analyticsApi } from '../api/client';
import { DashboardStats, VisiteTempo, ZoneVisite } from '../types';
import { StatCard, PageHeader, SectionLabel, Card } from '../components/ui';
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell,
} from 'recharts';

export default function Dashboard() {
  const [stats,  setStats]  = useState<DashboardStats | null>(null);
  const [visites, setVisites] = useState<VisiteTempo[]>([]);
  const [zones,  setZones]  = useState<ZoneVisite[]>([]);

  useEffect(() => {
    analyticsApi.dashboard().then(r => setStats(r.data.data));
    analyticsApi.temps(30).then(r => setVisites(r.data.data));
    analyticsApi.zones().then(r => setZones(r.data.data.slice(0, 8)));
  }, []);

  const tooltipStyle = {
    contentStyle: {
      background: 'hsl(0 0% 100%)',
      border: '1px solid hsl(30 15% 82%)',
      borderRadius: '0.5rem',
      fontSize: 12,
      color: 'hsl(30 19% 15%)',
      boxShadow: '0 4px 12px hsla(30,19%,15%,0.08)',
    },
    labelStyle: { color: 'hsl(30 10% 45%)' },
  };

  return (
    <div className="animate-fade-up">
      <PageHeader label="Vue d'ensemble · Tableau de bord" title="Dashboard" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        <StatCard
          label="Actualités publiées"
          value={stats?.actualites.publiees ?? '—'}
          sub={`${stats?.actualites.total ?? 0} au total`}
          gold
        />
        <StatCard label="Vues cumulées"     value={stats?.vues ?? '—'} />
        <StatCard
          label="Visiteurs uniques"
          value={stats?.visiteurs.total ?? '—'}
          sub={`+${stats?.visiteurs.derniers30Jours ?? 0} ce mois`}
        />
        <StatCard label="Messages"          value={stats?.contacts ?? '—'} />
        <StatCard label="Abonnés NL"        value={stats?.abonnesNewsletter ?? '—'} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <Card className="p-6">
          <SectionLabel>Visites · 30 derniers jours</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={visites} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="hsl(35,41%,47%)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(35,41%,47%)" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="vues" stroke="hsl(35,41%,47%)" strokeWidth={2} fill="url(#gv)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <SectionLabel>Visiteurs par pays</SectionLabel>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={zones} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="pays" tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'hsl(30,10%,60%)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="nbVisiteurs" radius={[3, 3, 0, 0]}>
                {zones.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? 'hsl(35,41%,47%)' : 'hsl(53,47%,86%)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

      </div>
    </div>
  );
}
