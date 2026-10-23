import type { CourseTotal } from '../lib/points'

export default function Leaderboard({ rows }: { rows: CourseTotal[] }) {
  return (
    <table className="table-formal leaderboard" aria-label="Clasificación general por curso">
      <thead><tr><th scope="col"><span className="sr-only">Posición</span><span aria-hidden="true">Pos.</span></th><th scope="col">Curso</th><th scope="col">Grupal</th><th scope="col">Individual</th><th scope="col">Total</th></tr></thead>
      <tbody>{rows.map((row, index) => (
        <tr key={row.courseId} className={index === 0 ? 'leading-row' : undefined}>
          <td>{index + 1}</td><th scope="row"><span>{row.shortName}</span>{index === 0 && <small>Primer lugar</small>}</th>
          <td>{row.grupal}</td><td>{row.individual}</td><td className="total-cell">{row.total}</td>
        </tr>
      ))}</tbody>
    </table>
  )
}
