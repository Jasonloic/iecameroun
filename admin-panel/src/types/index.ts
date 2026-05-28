export interface Admin {
  id: number; nom: string; email: string;
  role: 'admin' | 'editeur'; estActif: boolean; createdAt: string;
}
export interface Actualite {
  id: number; titre: string; resume: string; contenu: string;
  categorie: string; auteur: string; estPublie: boolean;
  vues: number; imageCover: string | null; createdAt: string; updatedAt: string;
}
export interface Document {
  id: number; titre: string; description: string | null;
  type: 'rapport' | 'note' | 'autre'; nomFichierOriginal: string;
  tailleFichier: number; mimeType: string; estPublic: boolean;
  telechargements: number; createdAt: string;
}
export interface NewsletterAbonne {
  id: number; email: string; estActif: boolean; createdAt: string;
}
export interface Contact {
  id: number; nom: string; email: string; sujet: string; message: string;
  statut: 'nouveau' | 'lu' | 'traite'; ipAddress: string | null; createdAt: string;
}
export interface DashboardStats {
  actualites: { total: number; publiees: number };
  vues: number;
  visiteurs: { total: number; derniers30Jours: number };
  contacts: number; abonnesNewsletter: number;
}
export interface ZoneVisite { pays: string | null; region: string | null; ville: string | null; nbVisiteurs: number; }
export interface PagePopulaire { path: string; vues: number; }
export interface VisiteTempo { date: string; vues: number; }
export interface ApiResponse<T> {
  success: boolean; message: string; data: T;
  meta?: { total: number; page: number; totalPages: number; };
}
