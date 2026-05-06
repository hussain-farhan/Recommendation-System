import { Link, NavLink, useNavigate } from 'react-router-dom'

const nav = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/recommendations', label: 'Recommended Projects' },
  { to: '/saved', label: 'Saved Projects' },
  { to: '/profile', label: 'Profile' },
  { to: '/settings', label: 'Settings' },
]

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 21V3a2 2 0 0 0-2-2H11a2 2 0 0 0-2 2v4" />
    </svg>
  )
}

export function AppSidebar({ onNavigate, theme, onToggleTheme }) {
  const navigate = useNavigate()
  const linkClass = ({ isActive }) =>
    `prs-sidebar__link${isActive ? ' prs-sidebar__link--active' : ''}`

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className="prs-sidebar" aria-label="Main navigation">
      <Link to="/" className="prs-sidebar__brand" onClick={onNavigate}>
        <span className="prs-sidebar__logo" aria-hidden="true" />
        <div>
          <strong className="prs-sidebar__title">ProjectMatch</strong>
          <span className="prs-sidebar__subtitle">Your workspace</span>
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
        <button
          type="button"
          className="prs-sidebar__theme-toggle"
          onClick={() => {
            onToggleTheme?.()
            onNavigate?.()
          }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="prs-sidebar__theme-toggle-icon" aria-hidden="true">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </span>
          <span className="prs-sidebar__theme-toggle-label">Dark Mode</span>
        </button>
        <button
          type="button"
          className="prs-sidebar__logout-btn"
          onClick={handleLogout}
          onMouseDown={() => onNavigate?.()}
          aria-label="Logout"
        >
          <span className="prs-sidebar__logout-icon" aria-hidden="true">
            <LogoutIcon />
          </span>
          <span className="prs-sidebar__logout-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}
