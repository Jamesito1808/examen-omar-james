import { NavLink, Route, Routes } from 'react-router-dom'
import { CalendarDays, LayoutList, Medal, ShieldCheck, Trophy } from 'lucide-react'
import General from './pages/General'
import Disciplina from './pages/Disciplina'
import Horario from './pages/Horario'
import Admin from './pages/Admin'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex min-h-[44px] items-center gap-2 rounded-sm border px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
    isActive
      ? 'border-navy bg-navy text-white'
      : 'border-line bg-white text-ink-soft hover:bg-surface'
  }`

export default function App() {
  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2">
        Skip to main content
      </a>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-navy text-white" aria-hidden="true">
              <Trophy size={20} strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-heading text-xl font-semibold leading-tight">Olimpiadas Escolares</p>
              <p className="text-sm text-ink-muted">Overall standings, disciplines and schedule</p>
            </div>
          </div>
          <nav aria-label="Primary" className="flex flex-wrap gap-2">
            <NavLink to="/" className={linkClass}>
              <Medal size={16} aria-hidden="true" /> Overall
            </NavLink>
            <NavLink to="/disciplinas" className={linkClass}>
              <LayoutList size={16} aria-hidden="true" /> Disciplines
            </NavLink>
            <NavLink to="/horario" className={linkClass}>
              <CalendarDays size={16} aria-hidden="true" /> Schedule
            </NavLink>
            <NavLink to="/admin" className={linkClass}>
              <ShieldCheck size={16} aria-hidden="true" /> Admin
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="/disciplinas" element={<Disciplina />} />
          <Route path="/horario" element={<Horario />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-ink-muted">
          <p>School Olympics week, Monday to Friday. Public read access, admin write access.</p>
        </div>
      </footer>
    </div>
  )
}
