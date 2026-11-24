import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import LanguageProvider from './i18n/LanguageProvider'
import { applyDocumentLocale, readLocalePreference } from './i18n/config'
import { applyThemePreference, readThemePreference } from './lib/theme'
import './index.css'

// Apply the saved theme and language before the first paint to avoid a flash of the wrong state.
applyThemePreference(readThemePreference())
applyDocumentLocale(readLocalePreference())

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('Root element #root is missing from index.html')

createRoot(rootEl).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
