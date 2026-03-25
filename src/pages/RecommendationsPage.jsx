import { Link } from 'react-router-dom'
import { getRecommended, projects } from '../data/projects'

export function RecommendationsPage() {
  const ranked = getRecommended(projects.length)

  return (
    <>
      <h1 className="prs-page-title">For you</h1>
      <p className="prs-page-lead">
        Ranked by fit to your declared stack, velocity, and risk appetite. Open a brief to see full
        context.
      </p>

      <ol className="prs-rank">
        {ranked.map((p, i) => (
          <li key={p.id} className="prs-rank__item">
            <span className="prs-rank__index" aria-hidden="true">
              {i + 1}
            </span>
            <div className="prs-rank__body">
              <Link to={`/projects/${p.id}`}>{p.title}</Link>
              <p className="prs-rank__meta">
                {p.category} · {p.tech.slice(0, 2).join(', ')}
                {p.tech.length > 2 ? '…' : ''}
              </p>
            </div>
            <span className="prs-rank__score">{p.matchScore}%</span>
          </li>
        ))}
      </ol>

      <p className="prs-page-lead" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
        Want to tune weights?{' '}
        <Link to="/projects" style={{ color: 'var(--prs-primary)', fontWeight: 600 }}>
          Explore the catalog
        </Link>{' '}
        and save projects—your model updates overnight.
      </p>
    </>
  )
}
