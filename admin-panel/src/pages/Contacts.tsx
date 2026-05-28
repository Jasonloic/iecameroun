import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactsApi } from '../api/client';
import { Contact } from '../types';
import {
  PageHeader, Card, Table, Modal,
  Badge, Btn, FilterPill,
} from '../components/ui';

type Statut = Contact['statut'];

const STATUT: Record<Statut, { label: string; variant: 'danger' | 'warning' | 'success' }> = {
  nouveau: { label: 'Nouveau', variant: 'danger'  },
  lu:      { label: 'Lu',      variant: 'warning' },
  traite:  { label: 'Traité',  variant: 'success' },
};

export default function Contacts() {
  const [data,     setData]     = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter,   setFilter]   = useState<Statut | 'tous'>('tous');

  const load = () => contactsApi.getAll().then(r => setData(r.data.data));

  useEffect(() => { load(); }, []);

  const updateStatut = async (id: number, statut: Statut) => {
    try {
      await contactsApi.updateStatut(id, statut);
      toast.success('Statut mis à jour'); load();
      if (selected?.id === id) setSelected(s => s ? { ...s, statut } : null);
    } catch { toast.error('Erreur'); }
  };

  const filtered = filter === 'tous' ? data : data.filter(c => c.statut === filter);

  const counts: Record<Statut, number> = {
    nouveau: data.filter(c => c.statut === 'nouveau').length,
    lu:      data.filter(c => c.statut === 'lu').length,
    traite:  data.filter(c => c.statut === 'traite').length,
  };

  const columns = [
    {
      key: 'nom', header: 'Expéditeur',
      render: (c: Contact) => (
        <div>
          <p className="font-medium text-ink text-sm">{c.nom}</p>
          <p className="text-[11px] text-muted-foreground">{c.email}</p>
        </div>
      ),
    },
    { key: 'sujet', header: 'Sujet' },
    {
      key: 'statut', header: 'Statut',
      render: (c: Contact) => (
        <Badge label={STATUT[c.statut].label} variant={STATUT[c.statut].variant} />
      ),
    },
    {
      key: 'createdAt', header: 'Date',
      render: (c: Contact) => new Date(c.createdAt).toLocaleDateString('fr-FR'),
    },
    {
      key: 'actions', header: '',
      render: (c: Contact) => (
        <button
          onClick={() => { setSelected(c); if (c.statut === 'nouveau') updateStatut(c.id, 'lu'); }}
          className="px-3 py-1.5 rounded text-xs border border-border text-muted-foreground hover:border-gold hover:text-gold transition-smooth"
        >
          Voir
        </button>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader label="Communication · Contacts" title="Messages" />

      {/* Filtres */}
      <div className="flex flex-wrap gap-2 mb-5">
        <FilterPill label="Tous" active={filter === 'tous'} onClick={() => setFilter('tous')} />
        {(['nouveau', 'lu', 'traite'] as Statut[]).map(s => (
          <FilterPill
            key={s}
            label={`${STATUT[s].label}${counts[s] > 0 ? ` (${counts[s]})` : ''}`}
            active={filter === s}
            onClick={() => setFilter(s)}
          />
        ))}
      </div>

      <Card>
        <Table columns={columns} data={filtered} keyExtractor={c => c.id} />
      </Card>

      {/* Détail message */}
      {selected && (
        <Modal title="Message reçu" onClose={() => setSelected(null)} width={600}>
          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-md border border-border mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Expéditeur</p>
              <p className="font-medium text-ink">{selected.nom}</p>
              <p className="text-xs text-muted-foreground">{selected.email}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Date</p>
              <p className="text-sm">{new Date(selected.createdAt).toLocaleString('fr-FR')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Sujet</p>
              <p className="font-medium text-ink">{selected.sujet}</p>
            </div>
          </div>

          {/* Corps */}
          <div className="p-4 bg-background border border-border rounded-md mb-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {selected.message}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground">Marquer comme :</span>
              {(['nouveau', 'lu', 'traite'] as Statut[]).map(s => (
                <button
                  key={s}
                  onClick={() => updateStatut(selected.id, s)}
                  className={`px-3 py-1.5 rounded text-xs border font-medium transition-smooth ${
                    selected.statut === s
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-gold hover:text-gold'
                  }`}
                >
                  {STATUT[s].label}
                </button>
              ))}
            </div>
            <Btn
              label="Répondre"
              icon={<Mail size={13} />}
              onClick={() => window.location.href = `mailto:${selected.email}?subject=RE: ${selected.sujet}`}
              variant="secondary"
              size="sm"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
