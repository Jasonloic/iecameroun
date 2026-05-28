import { useEffect, useState, FormEvent } from 'react';
import { Upload, Trash2, Download, FileText, ScrollText, File } from 'lucide-react';
import toast from 'react-hot-toast';
import { documentsApi } from '../api/client';
import { Document } from '../types';
import {
  PageHeader, Card, Table,
  Modal, Field, Btn, IconBtn, Badge,
  FilterPill, inputCls, SectionLabel,
} from '../components/ui';

type DocType = 'rapport' | 'note' | 'autre';

const TYPE_ICON: Record<DocType, typeof FileText> = {
  rapport: ScrollText, note: FileText, autre: File,
};
const TYPE_LABEL: Record<DocType, string> = {
  rapport: 'Rapport', note: 'Note', autre: 'Autre',
};

function formatBytes(b: number) {
  if (b < 1024) return `${b} o`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} Ko`;
  return `${(b / (1024 * 1024)).toFixed(1)} Mo`;
}

const EMPTY_FORM = { titre: '', description: '', type: 'autre' as DocType, estPublic: true };

export default function Documents() {
  const [data,       setData]       = useState<Document[]>([]);
  const [modal,      setModal]      = useState(false);
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [file,       setFile]       = useState<File | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [typeFilter, setTypeFilter] = useState<DocType | 'tous'>('tous');

  const load = async () => {
    const params = typeFilter !== 'tous' ? { type: typeFilter } : {};
    const res = await documentsApi.getAll(params);
    setData(res.data.data);
  };

  useEffect(() => { load(); }, [typeFilter]);

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) { toast.error('Aucun fichier sélectionné'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      fd.append('fichier', file);
      await documentsApi.upload(fd);
      toast.success('Document chargé');
      setModal(false); setForm(EMPTY_FORM); setFile(null); load();
    } catch { toast.error('Erreur lors du chargement'); }
    finally { setLoading(false); }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const res = await documentsApi.download(doc.id);
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url; a.download = doc.nomFichierOriginal; a.click();
      URL.revokeObjectURL(url);
    } catch { toast.error('Erreur de téléchargement'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer ce document ?')) return;
    try { await documentsApi.remove(id); toast.success('Supprimé'); load(); }
    catch { toast.error('Erreur'); }
  };

  const columns = [
    {
      key: 'titre', header: 'Document',
      render: (d: Document) => {
        const Icon = TYPE_ICON[d.type];
        return (
          <div className="flex items-center gap-3">
            <Icon size={16} className="text-gold flex-shrink-0" />
            <div>
              <p className="font-medium text-ink text-sm">{d.titre}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{d.nomFichierOriginal}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'type', header: 'Type',
      render: (d: Document) => <Badge label={TYPE_LABEL[d.type]} variant="gold" />,
    },
    {
      key: 'tailleFichier', header: 'Taille',
      render: (d: Document) => formatBytes(d.tailleFichier),
    },
    {
      key: 'telechargements', header: 'Téléch.', align: 'right' as const,
      render: (d: Document) => (
        <span className="font-display font-bold text-gold">{d.telechargements}</span>
      ),
    },
    {
      key: 'estPublic', header: 'Accès',
      render: (d: Document) => (
        <Badge label={d.estPublic ? 'Public' : 'Privé'} variant={d.estPublic ? 'success' : 'neutral'} />
      ),
    },
    {
      key: 'createdAt', header: 'Date',
      render: (d: Document) => new Date(d.createdAt).toLocaleDateString('fr-FR'),
    },
    {
      key: 'actions', header: '',
      render: (d: Document) => (
        <div className="flex gap-1.5 justify-end">
          <IconBtn icon={<Download size={13} />} onClick={() => handleDownload(d)} />
          <IconBtn icon={<Trash2 size={13} />}   onClick={() => handleDelete(d.id)} danger />
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader
        label="Contenu · Documents"
        title="Documents"
        action={<Btn label="Charger un document" onClick={() => setModal(true)} icon={<Upload size={14} />} />}
      />

      <div className="flex flex-wrap gap-2 mb-5">
        {(['tous', 'rapport', 'note', 'autre'] as const).map(t => (
          <FilterPill
            key={t}
            label={t === 'tous' ? 'Tous' : TYPE_LABEL[t]}
            active={typeFilter === t}
            onClick={() => setTypeFilter(t)}
          />
        ))}
      </div>

      <Card>
        <Table columns={columns} data={data} keyExtractor={d => d.id} />
      </Card>

      {modal && (
        <Modal title="Charger un document" onClose={() => setModal(false)}>
          <form onSubmit={handleUpload}>
            <Field label="Titre" required>
              <input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} required className={inputCls} />
            </Field>
            <Field label="Description">
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className={`${inputCls} resize-y`} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Type">
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as DocType }))} className={inputCls}>
                  <option value="rapport">Rapport</option>
                  <option value="note">Note</option>
                  <option value="autre">Autre</option>
                </select>
              </Field>
              <Field label="Visibilité">
                <select value={String(form.estPublic)} onChange={e => setForm(f => ({ ...f, estPublic: e.target.value === 'true' }))} className={inputCls}>
                  <option value="true">Public</option>
                  <option value="false">Privé</option>
                </select>
              </Field>
            </div>
            <Field label="Fichier (PDF, Word)" required>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files?.[0] || null)} required className={inputCls} />
              {file && <p className="mt-1.5 text-xs text-gold">{file.name} — {formatBytes(file.size)}</p>}
            </Field>
            <div className="flex gap-3 justify-end mt-2">
              <Btn label="Annuler" onClick={() => setModal(false)} variant="secondary" />
              <Btn label={loading ? 'Chargement…' : 'Charger'} type="submit" disabled={loading} icon={<Upload size={13} />} />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
