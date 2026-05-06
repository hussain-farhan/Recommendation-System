import { BrowserRouter, Link, Navigate, Route, Routes, Outlet, useLocation } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { LandingPage } from './pages/LandingPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { HomePage } from './pages/HomePage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { RecommendationsPage } from './pages/RecommendationsPage'
import { SavedProjectsPage } from './pages/SavedProjectsPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function NotFoundPage() {
  return (
    <div className="prs-empty">
      <h1>Page not found</h1>
      <p>The route you opened does not exist.</p>
      <Link to="/" className="prs-button prs-button--primary">
        Go home
      </Link>
    </div>
  )
}

function ProtectedRoute() {
  const token = localStorage.getItem('token')
  const location = useLocation()
  if (!token) {
    const redirect = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />
  }
  return <Outlet />
}

function PublicRoute() {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default entry */}
        <Route path="/" element={<LandingPage />} />
        <Route path="landing" element={<Navigate to="/" replace />} />

        {/* Auth screens */}
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Onboarding requires login but doesn't use MainLayout */}
        <Route element={<ProtectedRoute />}>
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="dashboard" element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailPage />} />
            <Route path="recommendations" element={<RecommendationsPage />} />
            <Route path="saved" element={<SavedProjectsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="home" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
