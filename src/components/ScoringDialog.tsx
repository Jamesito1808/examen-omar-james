import { useRef } from 'react'
import { INDIVIDUAL_POINTS } from '../data/mock'

export default function ScoringDialog() {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  return (
    <>
      <button ref={trigger} type="button" className="btn-formal btn-ghost" onClick={() => dialog.current?.showModal()}>
        Cómo se suman los puntos
      </button>
      <dialog ref={dialog} className="scoring-dialog" aria-labelledby="scoring-title" aria-describedby="scoring-description"
        onCancel={(event) => { event.preventDefault(); dialog.current?.close() }}
        onClose={() => trigger.current?.focus()}>
        <p className="section-kicker">Campeón de campeones</p>
        <h2 id="scoring-title">Cómo se suman los puntos</h2>
        <p id="scoring-description">El total de cada curso reúne los puntos grupales y los obtenidos en las pruebas individuales.</p>
        <h3>Pruebas individuales</h3>
        <dl className="points-scale">
          {Object.entries(INDIVIDUAL_POINTS).map(([position, points]) => (
            <div key={position}><dt>{position}.º puesto</dt><dd>{points} puntos</dd></div>
          ))}
        </dl>
        <h3>Pruebas grupales y desempates</h3>
        <p>Se suman los puntos registrados en las tablas de cada deporte. Si dos cursos tienen el mismo total, se comparan sus puntos individuales y, después, el nombre del curso.</p>
        <p className="text-ink-muted">Los resultados de esta versión son datos de demostración.</p>
        <button type="button" className="btn-formal btn-primary" onClick={() => dialog.current?.close()}>Cerrar explicación</button>
      </dialog>
    </>
  )
}
