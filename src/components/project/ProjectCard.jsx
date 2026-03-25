import { Link } from 'react-router-dom'

export function ProjectCard({ project, showScore = true }) {
  return (
    <article className="prs-card">
      <div className="prs-card__top">
        <span className="prs-badge">{project.category}</span>
        {showScore && (
          <span className="prs-card__score" title="Recommendation match">
            {project.matchScore}% match
          </span>
        )}
      </div>
      <h3 className="prs-card__title">
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </h3>
      <p className="prs-card__tagline">{project.tagline}</p>
      <ul className="prs-card__tags">
        {project.tech.slice(0, 3).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="prs-card__meta">
        <span>{project.duration}</span>
        <span>{project.teamSize} people</span>
      </div>
      <Link to={`/projects/${project.id}`} className="prs-card__cta">
        View brief
      </Link>
    </article>
  )
}
