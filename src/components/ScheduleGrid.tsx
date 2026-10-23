import { WEEK_DAYS, courseName, disciplineName, type Fixture } from '../data/mock'
import { dayName } from '../lib/display'

export default function ScheduleGrid({ fixtures }: { fixtures: Fixture[] }) {
  return (
    <div className="week-grid">
      {WEEK_DAYS.map((day) => {
        const matches = fixtures.filter((fixture) => fixture.fecha === day).sort((a, b) => a.hora.localeCompare(b.hora))
        return (
          <section key={day} aria-label={`Encuentros del ${dayName(day).toLowerCase()}`} className="day-card">
            <h2>{dayName(day)}</h2>
            <ul className="fixture-list">
              {matches.length === 0 && <li className="text-ink-muted">No hay encuentros programados.</li>}
              {matches.map((fixture) => (
                <li key={fixture.id}><time>{fixture.hora}</time><h3>{disciplineName(fixture.disciplineId)}</h3><p>{courseName(fixture.courseA)} contra {courseName(fixture.courseB)}</p><small>{fixture.sede}</small></li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
