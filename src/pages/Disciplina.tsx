import DisciplineSection from '../components/DisciplineSection'
import { disciplines, groupStandings, individualResults } from '../data/mock'

export default function Disciplina() {
  return (
    <section aria-labelledby="disciplines-title" className="flex flex-col gap-6">
      <div className="card-formal page-intro p-6">
        <p className="section-kicker">En la cancha y en la pista</p>
        <h1 id="disciplines-title" className="font-heading mt-1 text-3xl font-semibold">
          Disciplinas
        </h1>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Cada deporte tiene su propia historia. Consulta las tablas por curso y las marcas
          individuales en categorías masculina y femenina. Ajedrez reúne una sola categoría mixta.
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
