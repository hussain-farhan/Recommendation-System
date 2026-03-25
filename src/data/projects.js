/** Mock catalog for Project Recommendation System */

export const categories = ['All', 'Web', 'Mobile', 'Data', 'DevOps', 'Design']

export const projects = [
  {
    id: 'pr-aurora',
    title: 'Aurora Analytics',
    tagline: 'Real-time dashboards for product teams',
    category: 'Data',
    matchScore: 96,
    duration: '8–12 weeks',
    teamSize: '4–6',
    tech: ['React', 'D3', 'PostgreSQL'],
    description:
      'A modular analytics suite with role-based views, scheduled exports, and anomaly alerts tuned for SaaS metrics.',
    highlights: ['Live cohort explorer', 'Embeddable widgets', 'SOC2-ready audit trail'],
  },
  {
    id: 'pr-northwind',
    title: 'Northwind Commerce',
    tagline: 'Headless storefront with personalization',
    category: 'Web',
    matchScore: 91,
    duration: '10–14 weeks',
    teamSize: '5–8',
    tech: ['Next.js', 'Stripe', 'Redis'],
    description:
      'Composable commerce layer with A/B-tested recommendations, inventory sync, and edge-cached PDPs.',
    highlights: ['Personalized rails', 'Multi-region checkout', 'Merchant admin portal'],
  },
  {
    id: 'pr-pulse',
    title: 'Pulse Field',
    tagline: 'Offline-first mobile for field operations',
    category: 'Mobile',
    matchScore: 88,
    duration: '12–16 weeks',
    teamSize: '6–9',
    tech: ['React Native', 'SQLite', 'MQTT'],
    description:
      'Task routing, signature capture, and asset sync for distributed teams with intermittent connectivity.',
    highlights: ['Conflict-free sync', 'BLE device pairing', 'Role templates'],
  },
  {
    id: 'pr-circuit',
    title: 'Circuit CI',
    tagline: 'Pipelines that explain themselves',
    category: 'DevOps',
    matchScore: 85,
    duration: '6–10 weeks',
    teamSize: '3–5',
    tech: ['Go', 'Kubernetes', 'Temporal'],
    description:
      'Opinionated CI with flaky-test quarantine, cost caps per team, and human-readable failure narratives.',
    highlights: ['Policy-as-code gates', 'Artifact lineage', 'Slack/GitHub deep links'],
  },
  {
    id: 'pr-atlas',
    title: 'Atlas Design System',
    tagline: 'Tokens, docs, and Figma in one loop',
    category: 'Design',
    matchScore: 93,
    duration: '4–8 weeks',
    teamSize: '2–4',
    tech: ['Storybook', 'Figma API', 'CSS variables'],
    description:
      'Single source of truth for brand tokens with automated diff reviews and component adoption metrics.',
    highlights: ['Token drift alerts', 'Accessibility checks', 'Versioned releases'],
  },
  {
    id: 'pr-ledger',
    title: 'Ledger Lite',
    tagline: 'Double-entry bookkeeping API',
    category: 'Web',
    matchScore: 79,
    duration: '14–20 weeks',
    teamSize: '7–10',
    tech: ['TypeScript', 'PostgreSQL', 'GraphQL'],
    description:
      'Immutable journal with multi-entity support, reconciliation jobs, and export to major accounting tools.',
    highlights: ['Idempotent postings', 'Webhook fan-out', 'Sandbox tenants'],
  },
]

export function getProjectById(id) {
  return projects.find((p) => p.id === id)
}

export function getRecommended(limit = 4) {
  return [...projects].sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)
}
