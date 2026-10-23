import type { IndividualResult } from '../data/mock'
import { courseName } from '../data/mock'
import { formatMark } from '../lib/display'

interface Props {
  title: string
  rows: IndividualResult[]
  caption: string
}

// Two columns on the same page: Male | Female standings by position + course.
// Used by salto alto/largo and posta. Chess renders a single table instead.
export default function GenderSplit({ title, rows, caption }: Props) {
  const male = rows.filter((r) => r.genero === 'M').sort((a, b) => a.position - b.position)
  const female = rows.filter((r) => r.genero === 'F').sort((a, b) => a.position - b.position)

  const renderTable = (label: string, list: typeof rows) => (
    <div>
      <h3 className="mb-2 text-lg font-bold text-ink-soft">{label}</h3>
      <table className="table-formal" aria-label={`${title} ${label}`}>
        <thead>
          <tr>
            <th scope="col">Pos.</th>
            <th scope="col">Estudiante</th>
            <th scope="col">Curso</th>
            <th scope="col">Marca</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={`${label}-${r.position}-${r.athleteName}`}>
              <td className="font-semibold tabular-nums">{r.position}</td>
              <td>{r.athleteName}</td>
              <td>{courseName(r.courseId)}</td>
              <td className="tabular-nums">{formatMark(r.mark)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div>
      <p className="mb-3 text-sm text-ink-muted">{caption}</p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {renderTable('Masculino', male)}
        {renderTable('Femenino', female)}
      </div>
    </div>
  )
}
