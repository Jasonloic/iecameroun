import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.iecameroun.cm/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ie_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ie_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (email: string, motDePasse: string) => api.post('/auth/login', { email, motDePasse }),
  me: () => api.get('/auth/me'),
};

export const actualitesApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/actualites', { params }),
  create: (data: FormData) =>
    api.post('/actualites', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: number, data: FormData) =>
    api.put(`/actualites/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: number) => api.delete(`/actualites/${id}`),
};

export const documentsApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/documents', { params }),
  upload: (data: FormData) =>
    api.post('/documents', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  download: (id: number) =>
    api.get(`/documents/${id}/download`, { responseType: 'blob' }),
  remove: (id: number) => api.delete(`/documents/${id}`),
};

export const newsletterApi = {
  getAll: () => api.get('/newsletter'),
  broadcast: (sujet: string, contenu: string) =>
    api.post('/newsletter/broadcast', { sujet, contenu }),
};

export const contactsApi = {
  getAll: () => api.get('/contact'),
  updateStatut: (id: number, statut: string) =>
    api.patch(`/contact/${id}/statut`, { statut }),
};

export const analyticsApi = {
  dashboard: () => api.get('/analytics/dashboard'),
  zones: () => api.get('/analytics/zones'),
  temps: (jours = 30) => api.get('/analytics/temps', { params: { jours } }),
  pages: () => api.get('/analytics/pages'),
};
