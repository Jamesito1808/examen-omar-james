import { MapPin } from 'lucide-react'
import type { Discipline, GroupStanding, IndividualResult } from '../data/mock'
import { courseName } from '../data/mock'
import GenderSplit from './GenderSplit'

interface Props {
  discipline: Discipline
  standings?: GroupStanding[]
  results?: IndividualResult[]
}

// One section per discipline: competing courses plus standings.
// Group events show a course table; individual events show Male | Female
// columns, except unisex chess which shows a single table.
export default function DisciplineSection({ discipline, standings, results }: Props) {
  const isUnisex = discipline.genero === 'unisex'

  return (
    <article aria-labelledby={`disc-${discipline.id}`} className="card-formal p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 id={`disc-${discipline.id}`} className="font-heading text-2xl font-semibold">
            {discipline.nombre}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
            <MapPin size={14} aria-hidden="true" /> {discipline.sede}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="badge-formal">{discipline.tipo === 'grupal' ? 'Team event' : 'Individual event'}</span>
          <span className="badge-formal">{isUnisex ? 'Unisex' : discipline.genero === 'M' ? 'Male' : 'Female'}</span>
        </div>
      </div>

      <div className="mt-4">
        {discipline.tipo === 'grupal' && standings && (
          <div className="overflow-x-auto">
            <table className="table-formal min-w-[520px]" aria-label={`${discipline.nombre} standings`}>
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col" className="text-right">Played</th>
                  <th scope="col" className="text-right">Won</th>
                  <th scope="col" className="text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s) => (
                  <tr key={s.courseId}>
                    <td className="font-medium">{courseName(s.courseId)}</td>
                    <td className="text-right tabular-nums">{s.played}</td>
                    <td className="text-right tabular-nums">{s.won}</td>
                    <td className="text-right font-bold tabular-nums">{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {discipline.tipo === 'individual' && results && !isUnisex && (
          <GenderSplit
            title={discipline.nombre}
            rows={results}
            caption="Positions by course, split into two columns on the same page."
          />
        )}

        {discipline.tipo === 'individual' && results && isUnisex && (
          <div className="overflow-x-auto">
            <table className="table-formal min-w-[520px]" aria-label={`${discipline.nombre} unisex standings`}>
              <thead>
                <tr>
                  <th scope="col">Pos</th>
                  <th scope="col">Player</th>
                  <th scope="col">Course</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {[...results].sort((a, b) => a.position - b.position).map((r) => (
                  <tr key={r.athleteName}>
                    <td className="font-semibold tabular-nums">{r.position}</td>
                    <td>{r.athleteName}</td>
                    <td>{courseName(r.courseId)}</td>
                    <td className="tabular-nums">{r.mark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </article>
  )
}
