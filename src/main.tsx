import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/index'
import About from './pages/about'
import Features from './pages/features'
import Modules from './pages/modules'
import Community from './pages/community'
import Changelog from './pages/changelog'
import Privacy from './pages/privacy'
import Docs from './pages/docs'

import './css/custom.css' // if they have it, wait I should check if css exists

function App() {
  return (
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
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
