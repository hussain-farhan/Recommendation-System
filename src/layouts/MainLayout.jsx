import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { AppSidebar } from '../components/layout/AppSidebar'
import './MainLayout.css'

const PRS_THEME_KEY = 'prs-theme'
const PM_THEME_KEY = 'projectmatch-theme'

function readStoredTheme() {
  if (typeof window === 'undefined') return 'light'

  // Keep old/new keys in sync so toggling dark mode on any page keeps the app consistent.
  const storedPrs = localStorage.getItem(PRS_THEME_KEY)
  const storedPm = localStorage.getItem(PM_THEME_KEY)
  const stored = storedPrs ?? storedPm
  if (stored === 'dark' || stored === 'light') return stored

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, setTheme] = useState(readStoredTheme)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])

  const toggleTheme = useMemo(() => {
    return () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeSidebar()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSidebar])

  useEffect(() => {
    document.body.classList.toggle('prs-no-scroll', sidebarOpen)
    return () => document.body.classList.remove('prs-no-scroll')
  }, [sidebarOpen])

  useEffect(() => {
    // Dashboard CSS reads `data-prs-theme`, while landing reads `data-pm-theme`.
    document.documentElement.dataset.prsTheme = theme
    document.documentElement.dataset.pmTheme = theme

    // Persist to both keys for backward compatibility with older toggles.
    localStorage.setItem(PRS_THEME_KEY, theme)
    localStorage.setItem(PM_THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return
    root.classList.add('prs-root')
    return () => root.classList.remove('prs-root')
  }, [])

  return (
    <div className="prs-shell">
      <div
        className={`prs-backdrop${sidebarOpen ? ' prs-backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={closeSidebar}
      />
      <div id="prs-sidebar-panel" className={`prs-sidebar-wrap${sidebarOpen ? ' prs-sidebar-wrap--open' : ''}`}>
        <AppSidebar
          onNavigate={closeSidebar}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>
      <div className="prs-main">
        <AppHeader onMenuClick={toggleSidebar} menuOpen={sidebarOpen} />
        <main className="prs-content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
