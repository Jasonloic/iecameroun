import { useEffect, useState, FormEvent } from 'react';
import { Send, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { newsletterApi } from '../api/client';
import { NewsletterAbonne } from '../types';
import {
  PageHeader, Card, Table, Modal,
  Field, Btn, Badge, StatCard, inputCls,
} from '../components/ui';

export default function Newsletter() {
  const [abonnes, setAbonnes] = useState<NewsletterAbonne[]>([]);
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState({ sujet: '', contenu: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    newsletterApi.getAll().then(r => setAbonnes(r.data.data));
  }, []);

  const handleBroadcast = async (e: FormEvent) => {
    e.preventDefault();
    if (!confirm(`Envoyer à ${abonnes.length} abonné(s) ?`)) return;
    setLoading(true);
    try {
      await newsletterApi.broadcast(form.sujet, form.contenu);
      toast.success(`Newsletter envoyée à ${abonnes.length} abonné(s)`);
      setModal(false); setForm({ sujet: '', contenu: '' });
    } catch { toast.error("Erreur lors de l'envoi"); }
    finally { setLoading(false); }
  };

  const columns = [
    {
      key: 'email', header: 'Email',
      render: (a: NewsletterAbonne) => <span className="text-ink font-medium">{a.email}</span>,
    },
    {
      key: 'estActif', header: 'Statut',
      render: (a: NewsletterAbonne) => (
        <Badge label={a.estActif ? 'Actif' : 'Désabonné'} variant={a.estActif ? 'success' : 'neutral'} />
      ),
    },
    {
      key: 'createdAt', header: 'Inscrit le',
      render: (a: NewsletterAbonne) => new Date(a.createdAt).toLocaleDateString('fr-FR'),
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader
        label="Communication · Newsletter"
        title="Newsletter"
        action={
          <Btn
            label="Envoyer une newsletter"
            onClick={() => setModal(true)}
            icon={<Send size={14} />}
            disabled={abonnes.length === 0}
          />
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-8" style={{ maxWidth: 480 }}>
        <StatCard label="Abonnés actifs" value={abonnes.filter(a => a.estActif).length} gold />
      </div>

      <Card>
        <Table columns={columns} data={abonnes} keyExtractor={a => a.id} />
      </Card>

      {modal && (
        <Modal title="Envoyer une newsletter" onClose={() => setModal(false)} width={640}>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-md border border-border mb-5 text-sm text-muted-foreground">
            <Users size={14} className="text-gold flex-shrink-0" />
            <span>
              Sera envoyée à{' '}
              <strong className="text-gold">{abonnes.filter(a => a.estActif).length} abonné(s)</strong>
            </span>
          </div>

          <form onSubmit={handleBroadcast}>
            <Field label="Sujet" required>
              <input value={form.sujet} onChange={e => setForm(f => ({ ...f, sujet: e.target.value }))} required placeholder="Objet de la newsletter" className={inputCls} />
            </Field>
            <Field label="Contenu HTML" required>
              <textarea
                value={form.contenu}
                onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
                rows={10} required
                placeholder="<p>Votre contenu HTML ici…</p>"
                className={`${inputCls} resize-y font-mono text-xs`}
              />
            </Field>
            <div className="flex gap-3 justify-end">
              <Btn label="Annuler" onClick={() => setModal(false)} variant="secondary" />
              <Btn label={loading ? 'Envoi en cours…' : 'Envoyer'} type="submit" disabled={loading} icon={<Send size={13} />} />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
