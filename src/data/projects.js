export const categories = ["All", "Web", "Data"];

async function apiGet(path) {
  const res = await fetch(path, {
    headers: { Accept: "application/json" },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

export async function fetchProjects(category) {
  const url = new URL("/api/projects", window.location.origin);
  if (category && category !== "All") url.searchParams.set("category", category);
  const data = await apiGet(url.toString());
  return data.projects ?? [];
}

export async function fetchProjectById(id) {
  const data = await apiGet(`/api/projects/${encodeURIComponent(id)}`);
  return data.project;
}

export async function fetchRecommendedProjects(limit) {
  const url = new URL("/api/projects/recommended", window.location.origin);
  if (limit) url.searchParams.set("limit", String(limit));
  const data = await apiGet(url.toString());
  return data.projects ?? [];
}
