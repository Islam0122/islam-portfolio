import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useI18n } from '../i18n'

export default function Layout() {
  const { t } = useI18n()
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">{t.ui.common.skipToContent}</a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Re-keyed per route so every page gets one entrance. */}
        <div key={pathname} className="route-fade">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
