/**
 * - Local dev: empty origin → fetch `/api` (Vite proxies to `server.proxy` in vite.config.js).
 * - Production: uses VITE_API_ORIGIN if set, otherwise the default below (same host as the dev proxy).
 *   Set VITE_API_ORIGIN in the host’s env if your API lives elsewhere.
 */
const DEFAULT_API_ORIGIN = 'https://recommendation-system-rppp.onrender.com'
const API_ORIGIN = (
  import.meta.env.VITE_API_ORIGIN?.trim() ||
  (import.meta.env.DEV ? '' : DEFAULT_API_ORIGIN)
).replace(/\/$/, '')
const API_BASE = API_ORIGIN ? `${API_ORIGIN}/api` : '/api'

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('prs_token')
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export const api = {
  auth: {
    login: (body) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    register: (body) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  },
  projects: {
    list: (category) =>
      apiFetch(`/projects${category && category !== 'All' ? `?category=${category}` : ''}`),
    getById: (id) => apiFetch(`/projects/${id}`),
    recommended: (limit = 4) => apiFetch(`/projects/recommended?limit=${limit}`),
  },
  github: {
    search: (q, lang, limit = 20) =>
      apiFetch(`/github/search?q=${encodeURIComponent(q)}${lang ? `&lang=${lang}` : ''}&limit=${limit}`),
    recommended: (lang, limit = 10) =>
      apiFetch(`/github/recommended${lang ? `?lang=${lang}` : ''}${limit ? `${lang ? '&' : '?'}limit=${limit}` : ''}`),
  },
}
