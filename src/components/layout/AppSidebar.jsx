import { Link, NavLink } from 'react-router-dom'

const nav = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/recommendations', label: 'For you' },
]

export function AppSidebar({ onNavigate }) {
  const linkClass = ({ isActive }) =>
    `prs-sidebar__link${isActive ? ' prs-sidebar__link--active' : ''}`

  return (
    <aside className="prs-sidebar" aria-label="Main navigation">
      <Link to="/" className="prs-sidebar__brand" onClick={onNavigate}>
        <span className="prs-sidebar__logo" aria-hidden="true" />
        <div>
          <strong className="prs-sidebar__title">ProjectMatch</strong>
          <span className="prs-sidebar__subtitle">Recommendations</span>
        </div>
      </Link>
      <nav className="prs-sidebar__nav">
        {nav.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}
            onClick={onNavigate}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="prs-sidebar__footer">
        <p className="prs-sidebar__hint">Match scores update as your profile changes.</p>
      </div>
    </aside>
  )
}
