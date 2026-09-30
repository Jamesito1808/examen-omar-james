import { useMemo, useState } from 'react'
import { LockOpen, Plus, Trash2 } from 'lucide-react'
import { athletes as seedAthletes, courses as seedCourses, disciplines, type Athlete } from '../data/mock'

interface CourseRow {
  id: string
  grade: string
  paralelo: string
  shortName: string
}

interface BonusPoints {
  courseId: string
  grupal: number
  individual: number
}

const ADMIN_CODE = 'olimpiadas-admin'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  const [courseRows, setCourseRows] = useState<CourseRow[]>(
    seedCourses.map((c) => ({ id: c.id, grade: c.grade, paralelo: c.paralelo, shortName: c.shortName })),
  )
  const [grade, setGrade] = useState('3ero Bach')
  const [paralelo, setParalelo] = useState('E')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [bonus, setBonus] = useState<BonusPoints[]>(
    seedCourses.map((c) => ({ courseId: c.id, grupal: 0, individual: 0 })),
  )

  const [enrolled, setEnrolled] = useState<Athlete[]>(seedAthletes)
  const [studentName, setStudentName] = useState('')
  const [studentCourse, setStudentCourse] = useState(seedCourses[0].id)
  const [studentGender, setStudentGender] = useState<'M' | 'F'>('M')
  const [studentDiscipline, setStudentDiscipline] = useState(disciplines[0].id)

  const courseLabel = useMemo(() => {
    const map = new Map(courseRows.map((c) => [c.id, c.shortName]))
    return (id: string) => map.get(id) ?? id
  }, [courseRows])

  if (!authed) {
    return (
      <section aria-labelledby="admin-title" className="mx-auto flex max-w-md flex-col gap-4">
        <div className="card-formal p-6">
          <h1 id="admin-title" className="font-heading text-3xl font-semibold">Administration</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Mock authentication for v1. Enter the demo code to manage courses, points and entries.
          </p>
          <form
            className="mt-4 flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (code.trim() === ADMIN_CODE) {
                setAuthed(true)
                setError('')
              } else {
                setError('Invalid code. Hint: olimpiadas-admin')
              }
            }}
          >
            <label htmlFor="admin-code" className="text-sm font-semibold">
              Access code
            </label>
            <input
              id="admin-code"
              type="password"
              autoComplete="off"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="min-h-[44px] rounded-sm border border-line bg-white px-3 py-2 text-sm"
              placeholder="Enter admin code"
            />
            {error && (
              <p role="alert" className="text-sm font-medium text-red-800">
                {error}
              </p>
            )}
            <button type="submit" className="btn-formal btn-primary">
              <LockOpen size={16} aria-hidden="true" /> Unlock panel
            </button>
          </form>
        </div>
      </section>
    )
  }

  const addCourse = () => {
    const shortName = `${grade.split(' ')[0]} ${paralelo}`
    const id = `c-custom-${Date.now()}`
    setCourseRows((prev) => [...prev, { id, grade, paralelo, shortName }])
    setBonus((prev) => [...prev, { courseId: id, grupal: 0, individual: 0 }])
  }

  const saveEdit = (id: string, nextGrade: string, nextParalelo: string) => {
    setCourseRows((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, grade: nextGrade, paralelo: nextParalelo, shortName: `${nextGrade.split(' ')[0]} ${nextParalelo}` }
          : c,
      ),
    )
    setEditingId(null)
  }

  const enrollStudent = () => {
    if (!studentName.trim()) return
    const entry: Athlete = {
      id: `a-${Date.now()}`,
      nombre: studentName.trim(),
      courseId: studentCourse,
      genero: studentGender,
    }
    setEnrolled((prev) => [...prev, entry])
    setStudentName('')
  }

  const groupOptions = disciplines.filter((d) => d.tipo === 'grupal')
  const individualOptions = disciplines.filter((d) => d.tipo === 'individual')

  return (
    <section aria-labelledby="admin-title" className="flex flex-col gap-6">
      <div className="card-formal flex flex-wrap items-center justify-between gap-3 p-6">
        <div>
          <p className="text-sm font-semibold text-navy">Mock session</p>
          <h1 id="admin-title" className="font-heading text-3xl font-semibold">Administration</h1>
        </div>
        <button type="button" className="btn-formal btn-ghost" onClick={() => setAuthed(false)}>
          Lock panel
        </button>
      </div>

      <div className="card-formal p-4 md:p-6">
        <h2 className="font-heading text-xl font-semibold">Courses</h2>
        <p className="mt-1 text-sm text-ink-muted">Create, rename or remove courses. Changes are local to this session.</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="new-grade" className="text-sm font-semibold">Grade</label>
            <input id="new-grade" value={grade} onChange={(e) => setGrade(e.target.value)} className="min-h-[44px] rounded-sm border border-line px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="new-paralelo" className="text-sm font-semibold">Section</label>
            <input id="new-paralelo" value={paralelo} onChange={(e) => setParalelo(e.target.value)} className="min-h-[44px] w-24 rounded-sm border border-line px-3 py-2 text-sm" />
          </div>
          <button type="button" className="btn-formal btn-primary" onClick={addCourse}>
            <Plus size={16} aria-hidden="true" /> Add course
          </button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="table-formal min-w-[520px]" aria-label="Manage courses">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Grade</th>
                <th scope="col">Section</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseRows.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium">{c.shortName}</td>
                  <td>{editingId === c.id ? <EditGrade value={c.grade} onDone={(v) => saveEdit(c.id, v, c.paralelo)} /> : c.grade}</td>
                  <td>{c.paralelo}</td>
                  <td>
                    <div className="flex gap-2">
                      <button type="button" className="btn-formal btn-ghost !min-h-[36px] px-2 py-1 text-xs" onClick={() => setEditingId(c.id)}>
                        Rename
                      </button>
                      <button
                        type="button"
                        className="btn-formal btn-ghost !min-h-[36px] px-2 py-1 text-xs"
                        onClick={() => setCourseRows((prev) => prev.filter((x) => x.id !== c.id))}
                        aria-label={`Remove ${c.shortName}`}
                      >
                        <Trash2 size={14} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-formal p-4 md:p-6">
        <h2 className="font-heading text-xl font-semibold">Assign points</h2>
        <p className="mt-1 text-sm text-ink-muted">Manual bonus points per course, added on top of match results.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="table-formal min-w-[520px]" aria-label="Assign bonus points">
            <thead>
              <tr>
                <th scope="col">Course</th>
                <th scope="col">Group bonus</th>
                <th scope="col">Individual bonus</th>
              </tr>
            </thead>
            <tbody>
              {bonus.filter((b) => courseRows.some((c) => c.id === b.courseId)).map((b) => (
                <tr key={b.courseId}>
                  <td className="font-medium">{courseLabel(b.courseId)}</td>
                  <td>
                    <input
                      type="number"
                      aria-label={`Group bonus for ${courseLabel(b.courseId)}`}
                      value={b.grupal}
                      onChange={(e) =>
                        setBonus((prev) => prev.map((x) => (x.courseId === b.courseId ? { ...x, grupal: Number(e.target.value) } : x)))
                      }
                      className="min-h-[44px] w-24 rounded-sm border border-line px-2 py-1 text-sm tabular-nums"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      aria-label={`Individual bonus for ${courseLabel(b.courseId)}`}
                      value={b.individual}
                      onChange={(e) =>
                        setBonus((prev) => prev.map((x) => (x.courseId === b.courseId ? { ...x, individual: Number(e.target.value) } : x)))
                      }
                      className="min-h-[44px] w-24 rounded-sm border border-line px-2 py-1 text-sm tabular-nums"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card-formal p-4 md:p-6">
        <h2 className="font-heading text-xl font-semibold">Enroll students</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Team sports: futbol, basquet, voley. Individual: salto alto, salto largo, posta, ajedrez.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="student-name" className="text-sm font-semibold">Student name</label>
            <input id="student-name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="min-h-[44px] rounded-sm border border-line px-3 py-2 text-sm" placeholder="Full name" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="student-course" className="text-sm font-semibold">Course</label>
            <select id="student-course" value={studentCourse} onChange={(e) => setStudentCourse(e.target.value)} className="min-h-[44px] rounded-sm border border-line bg-white px-3 py-2 text-sm">
              {courseRows.map((c) => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="student-gender" className="text-sm font-semibold">Gender</label>
            <select id="student-gender" value={studentGender} onChange={(e) => setStudentGender(e.target.value as 'M' | 'F')} className="min-h-[44px] rounded-sm border border-line bg-white px-3 py-2 text-sm">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="student-discipline" className="text-sm font-semibold">Discipline</label>
            <select id="student-discipline" value={studentDiscipline} onChange={(e) => setStudentDiscipline(e.target.value)} className="min-h-[44px] rounded-sm border border-line bg-white px-3 py-2 text-sm">
              <optgroup label="Team">
                {groupOptions.map((d) => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </optgroup>
              <optgroup label="Individual">
                {individualOptions.map((d) => (
                  <option key={d.id} value={d.id}>{d.nombre}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
        <button type="button" className="btn-formal btn-primary mt-4" onClick={enrollStudent}>
          <Plus size={16} aria-hidden="true" /> Enroll in {disciplines.find((d) => d.id === studentDiscipline)?.nombre}
        </button>

        <div className="mt-4 overflow-x-auto">
          <table className="table-formal min-w-[520px]" aria-label="Enrolled students">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Course</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>
            <tbody>
              {enrolled.map((s) => (
                <tr key={s.id}>
                  <td>{s.nombre}</td>
                  <td>{courseLabel(s.courseId)}</td>
                  <td>{s.genero === 'M' ? 'Male' : 'Female'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function EditGrade({ value, onDone }: { value: string; onDone: (v: string) => void }) {
  const [v, setV] = useState(value)
  return (
    <span className="flex gap-2">
      <input
        aria-label="Edit grade"
        value={v}
        onChange={(e) => setV(e.target.value)}
        className="min-h-[36px] w-32 rounded-sm border border-line px-2 py-1 text-sm"
      />
      <button type="button" className="btn-formal btn-ghost !min-h-[36px] px-2 py-1 text-xs" onClick={() => onDone(v)}>
        Save
      </button>
    </span>
  )
}
