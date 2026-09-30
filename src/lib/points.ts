import { INDIVIDUAL_POINTS, courses, groupStandings, individualResults } from '../data/mock'

export interface CourseTotal {
  courseId: string
  shortName: string
  fullName: string
  grupal: number
  individual: number
  total: number
}

// Aggregates group standings + individual positions into one overall table.
// Tie-break: higher individual points rank first, then alphabetical shortName.
export function computeCourseTotals(): CourseTotal[] {
  const totals = new Map<string, CourseTotal>()
  for (const c of courses) {
    totals.set(c.id, { courseId: c.id, shortName: c.shortName, fullName: c.fullName, grupal: 0, individual: 0, total: 0 })
  }

  for (const rows of Object.values(groupStandings)) {
    for (const row of rows) {
      const entry = totals.get(row.courseId)
      if (entry) entry.grupal += row.points
    }
  }

  for (const rows of Object.values(individualResults)) {
    for (const row of rows) {
      const entry = totals.get(row.courseId)
      if (entry) entry.individual += INDIVIDUAL_POINTS[row.position] ?? 0
    }
  }

  const list = [...totals.values()].map((t) => ({ ...t, total: t.grupal + t.individual }))
  list.sort((a, b) => b.total - a.total || b.individual - a.individual || a.shortName.localeCompare(b.shortName))
  return list
}
