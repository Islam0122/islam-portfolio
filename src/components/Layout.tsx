import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useI18n } from '../i18n'

export default function Layout() {
  const { t } = useI18n()
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">{t.ui.common.skipToContent}</a>
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
