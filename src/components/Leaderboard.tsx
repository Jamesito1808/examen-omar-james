import { Crown } from 'lucide-react'
import type { CourseTotal } from '../lib/points'

interface Props {
  rows: CourseTotal[]
}

// Overall standings table: rectangular grid, gray header, tabular numbers.
export default function Leaderboard({ rows }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="table-formal min-w-[640px]" aria-label="Overall standings, champion of champions">
        <thead>
          <tr>
            <th scope="col" className="w-16">Rank</th>
            <th scope="col">Course</th>
            <th scope="col" className="text-right">Group</th>
            <th scope="col" className="text-right">Individual</th>
            <th scope="col" className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const isLeader = index === 0
            return (
              <tr key={row.courseId} className={isLeader ? 'bg-gold-soft' : undefined}>
                <td className="font-semibold tabular-nums">{index + 1}</td>
                <td>
                  <span className="flex items-center gap-2 font-medium">
                    {isLeader && (
                      <span className="badge-formal badge-gold">
                        <Crown size={14} aria-hidden="true" /> Leader
                      </span>
                    )}
                    {row.shortName}
                    <span className="hidden font-normal text-ink-muted md:inline">{row.fullName}</span>
                  </span>
                </td>
                <td className="text-right tabular-nums">{row.grupal}</td>
                <td className="text-right tabular-nums">{row.individual}</td>
                <td className="text-right font-bold tabular-nums">{row.total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
