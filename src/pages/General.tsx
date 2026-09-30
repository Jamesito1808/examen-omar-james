import { useMemo } from 'react'
import { Info } from 'lucide-react'
import Leaderboard from '../components/Leaderboard'
import { computeCourseTotals } from '../lib/points'

export default function General() {
  const rows = useMemo(() => computeCourseTotals(), [])

  return (
    <section aria-labelledby="overall-title" className="flex flex-col gap-6">
      <div className="card-formal p-6">
        <p className="text-sm font-semibold text-navy">Campeon de Campeones</p>
        <h1 id="overall-title" className="font-heading mt-1 text-3xl font-semibold">
          Overall Standings
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Top courses by total points across group and individual events. Group wins feed the group
          column, podium finishes feed the individual column.
        </p>
      </div>

      <div className="card-formal p-4 md:p-6">
        <Leaderboard rows={rows} />
        <p className="mt-4 flex items-start gap-2 text-sm text-ink-muted">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          Tie-break order: total points, then individual points, then course name. Individual scoring:
          1st 7 pts, 2nd 5 pts, 3rd 3 pts, 4th 1 pt.
        </p>
      </div>
    </section>
  )
}
