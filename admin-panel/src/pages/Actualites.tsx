import { useEffect, useState, FormEvent } from 'react';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { actualitesApi } from '../api/client';
import { Actualite } from '../types';
import {
  PageHeader, Card, Table, Pagination,
  Modal, Field, Btn, IconBtn, Badge,
  FilterPill, inputCls,
} from '../components/ui';

const EMPTY = { titre: '', contenu: '', resume: '', categorie: '', auteur: '', estPublie: false };

export default function Actualites() {
  const [data,       setData]       = useState<Actualite[]>([]);
  const [modal,      setModal]      = useState<'create' | 'edit' | null>(null);
  const [selected,   setSelected]   = useState<Actualite | null>(null);
  const [form,       setForm]       = useState(EMPTY);
  const [image,      setImage]      = useState<File | null>(null);
  const [loading,    setLoading]    = useState(false);
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search,     setSearch]     = useState('');
  const [statFilter, setStatFilter] = useState<'tous' | 'publie' | 'brouillon'>('tous');

  const load = async (p = 1, q = '') => {
    const res = await actualitesApi.getAll({ page: p, limit: 10, search: q || undefined });
    setData(res.data.data);
    setTotalPages(res.data.meta?.totalPages ?? 1);
  };

  useEffect(() => { load(page, search); }, [page]);

  const openCreate = () => { setForm(EMPTY); setImage(null); setSelected(null); setModal('create'); };
  const openEdit   = (a: Actualite) => {
    setSelected(a);
    setForm({ titre: a.titre, contenu: a.contenu, resume: a.resume, categorie: a.categorie, auteur: a.auteur, estPublie: a.estPublie });
    setImage(null); setModal('edit');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      if (image) fd.append('imageCover', image);
      modal === 'create' ? await actualitesApi.create(fd) : await actualitesApi.update(selected!.id, fd);
      toast.success(modal === 'create' ? 'Actualité créée' : 'Actualité mise à jour');
      setModal(null); load(page, search);
    } catch { toast.error('Une erreur est survenue'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette actualité ?')) return;
    try { await actualitesApi.remove(id); toast.success('Supprimée'); load(page, search); }
    catch { toast.error('Erreur de suppression'); }
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const filtered = data.filter(a => {
    if (statFilter === 'publie')    return a.estPublie;
    if (statFilter === 'brouillon') return !a.estPublie;
    return true;
  });

  const columns = [
    {
      key: 'titre', header: 'Titre',
      render: (a: Actualite) => (
        <span className="font-medium text-ink text-sm">{a.titre}</span>
      ),
    },
    { key: 'categorie', header: 'Catégorie' },
    { key: 'auteur',    header: 'Auteur' },
    {
      key: 'vues', header: 'Vues', align: 'right' as const,
      render: (a: Actualite) => (
        <span className="font-display font-bold text-gold">{a.vues.toLocaleString()}</span>
      ),
    },
    {
      key: 'estPublie', header: 'Statut',
      render: (a: Actualite) => (
        <Badge label={a.estPublie ? 'Publié' : 'Brouillon'} variant={a.estPublie ? 'success' : 'neutral'} />
      ),
    },
    {
      key: 'createdAt', header: 'Date',
      render: (a: Actualite) => new Date(a.createdAt).toLocaleDateString('fr-FR'),
    },
    {
      key: 'actions', header: '',
      render: (a: Actualite) => (
        <div className="flex gap-1.5 justify-end">
          <IconBtn icon={<Pencil size={13} />} onClick={() => openEdit(a)} />
          <IconBtn icon={<Trash2 size={13} />} onClick={() => handleDelete(a.id)} danger />
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      <PageHeader
        label="Contenu · Actualités"
        title="Actualités"
        action={<Btn label="Nouvelle actualité" onClick={openCreate} icon={<Plus size={14} />} />}
      />

      {/* Filtres + recherche — même pattern que la Bibliothèque */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-5">
        <div className="flex flex-wrap gap-2">
          {(['tous', 'publie', 'brouillon'] as const).map(f => (
            <FilterPill
              key={f}
              label={f === 'tous' ? 'Tous' : f === 'publie' ? 'Publiés' : 'Brouillons'}
              active={statFilter === f}
              onClick={() => setStatFilter(f)}
            />
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <input
            placeholder="Rechercher un titre, résumé…"
            value={search}
            onChange={e => { setSearch(e.target.value); load(1, e.target.value); }}
            className={inputCls}
          />
        </div>
      </div>

      <Card>
        <Table columns={columns} data={filtered} keyExtractor={a => a.id} />
        <Pagination page={page} total={totalPages} onChange={setPage} />
      </Card>

      {modal && (
        <Modal
          title={modal === 'create' ? 'Nouvelle actualité' : "Modifier l'actualité"}
          onClose={() => setModal(null)}
          width={700}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Titre" required>
                <input value={form.titre}    onChange={set('titre')}    required className={inputCls} />
              </Field>
              <Field label="Auteur" required>
                <input value={form.auteur}   onChange={set('auteur')}   required className={inputCls} />
              </Field>
              <Field label="Catégorie" required>
                <input value={form.categorie} onChange={set('categorie')} required className={inputCls} />
              </Field>
              <Field label="Image de couverture">
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setImage(e.target.files?.[0] || null)} className={inputCls} />
              </Field>
            </div>

            <Field label="Résumé">
              <textarea value={form.resume} onChange={set('resume')} rows={2} className={`${inputCls} resize-y`} />
            </Field>

            <Field label="Contenu" required>
              <textarea value={form.contenu} onChange={set('contenu')} rows={8} required className={`${inputCls} resize-y`} />
            </Field>

            <div className="flex items-center gap-3 mb-6 p-3 bg-secondary rounded-md border border-border">
              <input
                type="checkbox" id="pub"
                checked={form.estPublie}
                onChange={e => setForm(f => ({ ...f, estPublie: e.target.checked }))}
                className="rounded border-border"
              />
              <label htmlFor="pub" className="text-sm text-muted-foreground cursor-pointer flex items-center gap-2">
                {form.estPublie
                  ? <><Eye size={14} className="text-forest" /> Publié — visible sur le site</>
                  : <><EyeOff size={14} /> Brouillon — non visible</>}
              </label>
            </div>

            <div className="flex gap-3 justify-end">
              <Btn label="Annuler"    onClick={() => setModal(null)} variant="secondary" />
              <Btn label={loading ? 'Enregistrement…' : 'Enregistrer'} type="submit" disabled={loading} />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
