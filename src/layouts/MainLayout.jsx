import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from '../components/layout/AppHeader'
import { AppSidebar } from '../components/layout/AppSidebar'
import './MainLayout.css'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])

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

  return (
    <div className="prs-shell">
      <div
        className={`prs-backdrop${sidebarOpen ? ' prs-backdrop--visible' : ''}`}
        aria-hidden="true"
        onClick={closeSidebar}
      />
      <div id="prs-sidebar-panel" className={`prs-sidebar-wrap${sidebarOpen ? ' prs-sidebar-wrap--open' : ''}`}>
        <AppSidebar onNavigate={closeSidebar} />
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
