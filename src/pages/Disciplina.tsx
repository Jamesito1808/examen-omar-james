import DisciplineSection from '../components/DisciplineSection'
import { disciplines, groupStandings, individualResults } from '../data/mock'

export default function Disciplina() {
  return (
    <section aria-labelledby="disciplines-title" className="flex flex-col gap-6">
      <div className="card-formal p-6">
        <p className="text-sm font-semibold text-navy">Events</p>
        <h1 id="disciplines-title" className="font-heading mt-1 text-3xl font-semibold">
          Disciplines
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Competing courses per discipline. Team sports list course standings; individual events show
          Male and Female columns side by side, except unisex chess with a single table.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {disciplines.map((d) => (
          <DisciplineSection
            key={d.id}
            discipline={d}
            standings={d.tipo === 'grupal' ? groupStandings[d.id] : undefined}
            results={d.tipo === 'individual' ? individualResults[d.id] : undefined}
          />
        ))}
      </div>
    </section>
  )
}
