import { useMemo } from 'react'
import ScheduleGrid from '../components/ScheduleGrid'
import { fixtures } from '../data/mock'
import { detectConflicts } from '../lib/schedule'

export default function Horario() {
  const conflicts = useMemo(() => detectConflicts(fixtures), [])
  const isClean = conflicts.length === 0

  return (
    <section aria-labelledby="schedule-title" className="flex flex-col gap-6">
      <div className="card-formal page-intro p-6">
        <p className="section-kicker">De lunes a viernes</p>
        <h1 id="schedule-title" className="font-heading mt-1 text-3xl font-semibold">
          Una semana de encuentros
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Organiza tu semana: revisa el día, la hora y la sede de cada encuentro.
          Esta agenda utiliza datos de demostración, no un calendario oficial.
        </p>
        <p className="mt-3">
          {isClean ? (
            <span className="badge-formal">
              Sin cruces de horario entre cursos
            </span>
          ) : (
            <span className="badge-formal" role="alert">
              {conflicts.length} cruces de horario detectados
            </span>
          )}
        </p>
      </div>

      <ScheduleGrid fixtures={fixtures} />

      {conflicts.length > 0 && (
        <ul className="card-formal p-4 text-sm text-ink-soft" aria-label="Cruces de horario">
          {conflicts.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
