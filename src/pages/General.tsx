import { Link } from 'react-router-dom'
import Leaderboard from '../components/Leaderboard'
import ScoringDialog from '../components/ScoringDialog'
import { computeCourseTotals } from '../lib/points'
import { courses, disciplines, fixtures, courseName, disciplineName } from '../data/mock'
import { dayName } from '../lib/display'

const rows = computeCourseTotals()

export default function General() {
  return (
    <div className="home-layout">
      <section className="meet-hero page-intro" aria-labelledby="overall-title">
        <div className="hero-copy">
          <p className="section-kicker">Una semana para dar lo mejor</p>
          <h1 id="overall-title">Cada curso cuenta.<br />Cada punto también.</h1>
          <p>En la cancha, en la pista y frente al tablero. Sigue el esfuerzo de cada curso y descubre cómo avanza la clasificación.</p>
          <div className="hero-actions"><Link to="/disciplinas" className="btn-formal btn-primary">Explorar disciplinas</Link><Link to="/horario" className="text-link">Consultar horario</Link></div>
          <p className="demo-note">Datos de demostración · No son resultados en directo</p>
        </div>
        <div className="hero-scoreboard">
          <div className="track-lines" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="scoreboard-content">
            <p>Campeón de campeones</p>
            <span className="scoreboard-course">{rows[0].shortName}</span>
            <div className="scoreboard-total"><strong>{rows[0].total}</strong><span>puntos<br />en la clasificación</span></div>
            <dl><div><dt>Grupales</dt><dd>{rows[0].grupal}</dd></div><div><dt>Individuales</dt><dd>{rows[0].individual}</dd></div></dl>
            <p className="scoreboard-note">Primer lugar en los datos de ejemplo</p>
          </div>
        </div>
      </section>

      <dl className="meet-facts">
        <div><dd>{courses.length}</dd><dt>Cursos participantes</dt></div>
        <div><dd>{disciplines.length}</dd><dt>Disciplinas deportivas</dt></div>
        <div><dd>{fixtures.length}</dd><dt>Encuentros en agenda</dt></div>
        <div><dd>Lun—Vie</dd><dt>Una semana de encuentro</dt></div>
      </dl>

      <section aria-labelledby="leaders-title">
        <div className="section-heading"><div><p className="section-kicker">El esfuerzo suma</p><h2 id="leaders-title">Cursos que marcan el paso</h2></div><span className="text-ink-muted">Primeros tres de la clasificación</span></div>
        <ol className="leaders-grid">
          {rows.slice(0, 3).map((row, index) => (
            <li key={row.courseId} className="leader-card">
              <div className="leader-rank">{index + 1}.º <span>puesto</span></div>
              <span className="course-jersey" aria-hidden="true">{row.shortName}</span>
              <div className="leader-detail"><h3>{row.fullName}</h3><p>{row.grupal} grupales + {row.individual} individuales</p></div>
              <div className="leader-points"><strong>{row.total}</strong><span>puntos</span></div>
            </li>
          ))}
        </ol>
      </section>

      <div className="results-agenda">
        <section className="standings-panel" aria-labelledby="standings-title">
          <div className="section-heading"><div><p className="section-kicker">Campeón de campeones</p><h2 id="standings-title">Clasificación general</h2></div><ScoringDialog /></div>
          <Leaderboard rows={rows} />
          <p className="table-note">Puntos grupales + individuales = total del curso.</p>
        </section>
        <section className="agenda-panel" aria-labelledby="agenda-title">
          <p className="section-kicker">Agenda de ejemplo</p><h2 id="agenda-title">Próximos encuentros</h2>
          <p className="text-ink-muted">Al inicio de la semana</p>
          <ol className="agenda-list">
            {fixtures.slice(0, 3).map((fixture) => (
              <li key={fixture.id}><div className="agenda-time"><span>{dayName(fixture.fecha)}</span><time>{fixture.hora}</time></div><div><h3>{disciplineName(fixture.disciplineId)}</h3><p>{courseName(fixture.courseA)} contra {courseName(fixture.courseB)}</p><small>{fixture.sede}</small></div></li>
            ))}
          </ol>
          <Link to="/horario" className="btn-formal btn-ghost">Ver toda la semana</Link>
        </section>
      </div>
    </div>
  )
}
