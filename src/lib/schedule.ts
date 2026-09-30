import type { Fixture, WeekDay } from '../data/mock'
import { WEEK_DAYS } from '../data/mock'

export interface SlotKey {
  fecha: WeekDay
  hora: string
}

const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:00'] as const

// Generates a single round-robin rotation for an even or odd list of course ids.
// Classic circle method: first course fixed, others rotate each round.
export function generateRoundRobin(courseIds: string[]): string[][][] {
  const ids = [...courseIds]
  if (ids.length % 2 === 1) ids.push('BYE')
  const rounds: string[][][] = []
  const fixed = ids[0]
  const rotating = ids.slice(1)
  const totalRounds = ids.length - 1
  for (let round = 0; round < totalRounds; round += 1) {
    const pairs: string[][] = []
    const order = [fixed, ...rotating]
    for (let i = 0; i < order.length / 2; i += 1) {
      const a = order[i]
      const b = order[order.length - 1 - i]
      if (a !== 'BYE' && b !== 'BYE') pairs.push([a, b])
    }
    rounds.push(pairs)
    rotating.push(rotating.shift() as string)
  }
  return rounds
}

function slotKey(fecha: WeekDay, hora: string): string {
  return `${fecha}|${hora}`
}

// Validator: no course may appear in two fixtures at the same day+hour.
// Returns human-readable conflict descriptions (empty when conflict-free).
export function detectConflicts(fixtures: Fixture[]): string[] {
  const seen = new Map<string, string>()
  const conflicts: string[] = []
  for (const f of fixtures) {
    for (const course of [f.courseA, f.courseB]) {
      const key = `${course}@${slotKey(f.fecha, f.hora)}`
      const prev = seen.get(key)
      if (prev) {
        conflicts.push(`Conflict: course ${course} double-booked at ${f.fecha} ${f.hora} (${prev} vs ${f.id})`)
      } else {
        seen.set(key, f.id)
      }
    }
  }
  return conflicts
}

// Spreads round-robin pairs across Lun-Vie slots, skipping occupied slots.
// Guarantees the returned list has no course clash by construction.
export function generateWeekSchedule(
  disciplineId: string,
  sede: string,
  courseIds: string[],
  existing: Fixture[] = [],
): Fixture[] {
  const rounds = generateRoundRobin(courseIds)
  const occupied = new Set(existing.map((f) => `${f.courseA}@${slotKey(f.fecha, f.hora)}`).concat(
    existing.map((f) => `${f.courseB}@${slotKey(f.fecha, f.hora)}`),
  ))
  const created: Fixture[] = []
  let counter = 1

  const claim = (courseA: string, courseB: string): Fixture | null => {
    for (const fecha of WEEK_DAYS) {
      for (const hora of TIME_SLOTS) {
        const ka = `${courseA}@${slotKey(fecha, hora)}`
        const kb = `${courseB}@${slotKey(fecha, hora)}`
        if (!occupied.has(ka) && !occupied.has(kb)) {
          occupied.add(ka)
          occupied.add(kb)
          const fixture: Fixture = {
            id: `${disciplineId}-w${counter}`,
            disciplineId,
            fecha,
            hora,
            sede,
            courseA,
            courseB,
          }
          counter += 1
          created.push(fixture)
          return fixture
        }
      }
    }
    return null
  }

  for (const round of rounds) {
    for (const [a, b] of round) claim(a, b)
  }
  return created
}

// Manual test: run with `pnpm run build` safe — call from console when needed.
// generateWeekSchedule('futbol', 'Cancha principal', ['c-3a','c-3b','c-3c','c-3d'], fixtures)
// then detectConflicts([...fixtures, ...created]) must return [].
