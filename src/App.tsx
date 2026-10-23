import { useEffect, useRef } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import General from './pages/General'
import Disciplina from './pages/Disciplina'
import Horario from './pages/Horario'
import Admin from './pages/Admin'
import ThemeToggle from './components/ThemeToggle'

gsap.registerPlugin(useGSAP)
const pageTitles: Record<string, string> = { '/': 'Clasificación general', '/disciplinas': 'Disciplinas', '/horario': 'Horario', '/admin': 'Administración' }

export default function App() {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.page-intro', { y: 12, opacity: 0.6, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' })
    }, main)
    return () => media.revert()
  }, { scope: main, dependencies: [pathname], revertOnUpdate: true })

  useEffect(() => {
    document.title = `${pageTitles[pathname] ?? 'Olimpiadas'} | Olimpiadas escolares`
    if (previousPath.current !== pathname) {
      main.current?.focus({ preventScroll: true })
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">Saltar al contenido principal</a>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" aria-label="Olimpiadas escolares: inicio">
            <img className="brand-logo" src="/ueea-logo.jpg" alt="Escudo de la Unidad Educativa Ecuatoriana Austriaca Pedro Carbo" width={46} height={46} />
            <span><strong>Olimpiadas escolares</strong><small>El encuentro de nuestros cursos</small></span>
          </NavLink>
          <nav aria-label="Navegación principal">
            <NavLink end to="/">General</NavLink>
            <NavLink to="/disciplinas">Disciplinas</NavLink>
            <NavLink to="/horario">Horario</NavLink>
            <NavLink to="/admin">Administración</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1} className="main-container">
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/disciplinas" element={<Disciplina />} />
          <Route path="/horario" element={<Horario />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div><strong>El deporte nos reúne.</strong><p>Olimpiadas escolares · De lunes a viernes</p></div>
        <p>Versión de demostración. Resultados y agenda de ejemplo.</p>
      </footer>
    </div>
  )
}
