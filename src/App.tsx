import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import TundukMark from './components/TundukMark'
import { useI18n } from './i18n'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const TechStackPage = lazy(() => import('./pages/TechStackPage'))
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'))
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  const { t } = useI18n()
  return (
    <div role="status" aria-live="polite" className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center gap-3 px-4 text-sm text-muted sm:px-6">
      <TundukMark size={22} className="animate-spin text-accent [animation-duration:2.4s]" />
      {t.ui.common.loading}
    </div>
  )
}

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Anchored links (e.g. /projects/cover-studio#video) are scrolled by the page that owns the anchor.
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTopOnNavigate />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="tech-stack" element={<TechStackPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="architecture" element={<ArchitecturePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}
