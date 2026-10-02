import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource-variable/inter/wght.css'
import Home from './pages/index'

import './css/custom.css'

// Home is the landing page, so it stays in the main bundle; every other page
// (and heavy deps like react-markdown on /docs) loads on demand.
const About = lazy(() => import('./pages/about'))
const Features = lazy(() => import('./pages/features'))
const Modules = lazy(() => import('./pages/modules'))
const Community = lazy(() => import('./pages/community'))
const Changelog = lazy(() => import('./pages/changelog'))
const Privacy = lazy(() => import('./pages/privacy'))
const Docs = lazy(() => import('./pages/docs'))

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/community" element={<Community />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/docs/*" element={<Docs />} />
      </Routes>
    </Suspense>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
