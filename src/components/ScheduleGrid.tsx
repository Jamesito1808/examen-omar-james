import { WEEK_DAYS, courseName, disciplineName, type Fixture } from '../data/mock'

interface Props {
  fixtures: Fixture[]
}

// Weekly grid Monday to Friday. Each day is a column on desktop,
// stacked sections on mobile. No course plays twice in the same slot.
export default function ScheduleGrid({ fixtures }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      {WEEK_DAYS.map((day) => {
        const dayFixtures = fixtures
          .filter((f) => f.fecha === day)
          .sort((a, b) => a.hora.localeCompare(b.hora))
        return (
          <section key={day} aria-label={`Schedule for ${day}`} className="card-formal p-4">
            <h3 className="font-heading text-lg font-semibold">{day}</h3>
            <div className="mt-3 flex flex-col gap-2">
              {dayFixtures.length === 0 && (
                <p className="text-sm text-ink-muted">No fixtures scheduled.</p>
              )}
              {dayFixtures.map((f) => (
                <div key={f.id} className="rounded-sm border border-line bg-surface p-3">
                  <p className="text-xs font-bold text-navy tabular-nums">{f.hora}</p>
                  <p className="mt-1 text-sm font-semibold">{disciplineName(f.disciplineId)}</p>
                  <p className="text-sm text-ink-soft">
                    {courseName(f.courseA)} vs {courseName(f.courseB)}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">{f.sede}</p>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
