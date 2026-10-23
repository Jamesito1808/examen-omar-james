import { formatMark } from '../lib/display'
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
    <article aria-labelledby={`disc-${discipline.id}`} className="card-formal discipline-card p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 id={`disc-${discipline.id}`} className="font-heading text-2xl font-semibold">
            {discipline.nombre}
          </h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
            {discipline.sede}
          </p>
        </div>
        <div className="flex gap-2">
          <span className="event-label">{discipline.tipo === 'grupal' ? 'Por equipos' : 'Prueba individual'}</span>
          <span className="badge-formal">{isUnisex ? 'Categoría mixta' : discipline.tipo === 'individual' ? 'Masculino y femenino' : discipline.genero === 'M' ? 'Masculino' : 'Femenino'}</span>
        </div>
      </div>

      <div className="mt-4">
        {discipline.tipo === 'grupal' && standings && (
          <div className="overflow-x-auto">
            <table className="table-formal" aria-label={`Clasificación de ${discipline.nombre}`}>
              <thead>
                <tr>
                  <th scope="col">Curso</th>
                  <th scope="col" className="text-right">Jugados</th>
                  <th scope="col" className="text-right">Ganados</th>
                  <th scope="col" className="text-right">Puntos</th>
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
            caption="Resultados por categoría. Las marcas son de ejemplo."
          />
        )}

        {discipline.tipo === 'individual' && results && isUnisex && (
          <div className="overflow-x-auto">
            <table className="table-formal" aria-label={`Clasificación mixta de ${discipline.nombre}`}>
              <thead>
                <tr>
                  <th scope="col">Pos.</th>
                  <th scope="col">Estudiante</th>
                  <th scope="col">Curso</th>
                  <th scope="col">Puntos</th>
                </tr>
              </thead>
              <tbody>
                {[...results].sort((a, b) => a.position - b.position).map((r) => (
                  <tr key={r.athleteName}>
                    <td className="font-semibold tabular-nums">{r.position}</td>
                    <td>{r.athleteName}</td>
                    <td>{courseName(r.courseId)}</td>
                    <td className="tabular-nums">{formatMark(r.mark)}</td>
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
