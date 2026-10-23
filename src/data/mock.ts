// Local mock data for v1. Supabase provides schema + client only; UI reads this file.

export interface Course {
  id: string
  grade: string
  paralelo: string
  color: string
  shortName: string
  fullName: string
}

export interface Discipline {
  id: string
  nombre: string
  tipo: 'grupal' | 'individual'
  genero: 'M' | 'F' | 'unisex'
  sede: string
}

export interface Athlete {
  id: string
  nombre: string
  courseId: string
  genero: 'M' | 'F'
}

export interface GroupStanding {
  courseId: string
  played: number
  won: number
  drawn: number
  lost: number
  points: number
}

export interface IndividualResult {
  position: number
  athleteName: string
  courseId: string
  genero: 'M' | 'F'
  mark: string
}

export type WeekDay = 'Lun' | 'Mar' | 'Mie' | 'Jue' | 'Vie'

export interface Fixture {
  id: string
  disciplineId: string
  fecha: WeekDay
  hora: string
  sede: string
  courseA: string
  courseB: string
}

export const WEEK_DAYS: WeekDay[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie']

export const courses: Course[] = [
  { id: 'c-3a', grade: '3ero Bach', paralelo: 'Cañar', color: '#1E3A5F', shortName: '3ro Cañar', fullName: 'Tercero Bachillerato Cañar' },
  { id: 'c-3b', grade: '3ero Bach', paralelo: 'Loja', color: '#334155', shortName: '3ro Loja', fullName: 'Tercero Bachillerato Loja' },
  { id: 'c-3c', grade: '3ero Bach', paralelo: 'Babahoyo', color: '#475569', shortName: '3ro Babahoyo', fullName: 'Tercero Bachillerato Babahoyo' },
  { id: 'c-2a', grade: '2do Bach', paralelo: 'Ibarra', color: '#3F4A5A', shortName: '2do Ibarra', fullName: 'Segundo Bachillerato Ibarra' },
  { id: 'c-2b', grade: '2do Bach', paralelo: 'Sucumbios', color: '#5B6575', shortName: '2do Sucumbios', fullName: 'Segundo Bachillerato Sucumbios' },
  { id: 'c-2c', grade: '2do Bach', paralelo: 'Baños', color: '#64748B', shortName: '2do Baños', fullName: 'Segundo Bachillerato Baños' },
  { id: 'c-1a', grade: '1ero Bach', paralelo: 'Pastaza', color: '#6B7280', shortName: '1ro Pastaza', fullName: 'Primero Bachillerato Pastaza' },
  { id: 'c-1b', grade: '1ero Bach', paralelo: 'Otavalo', color: '#7C8798', shortName: '1ro Otavalo', fullName: 'Primero Bachillerato Otavalo' },
  { id: 'c-1c', grade: '1ero Bach', paralelo: 'Guayaquil', color: '#2C3E50', shortName: '1ro Guayaquil', fullName: 'Primero Bachillerato Guayaquil' },
  { id: 'c-1d', grade: '1ero Bach', paralelo: 'Portoviejo', color: '#55606E', shortName: '1ro Portoviejo', fullName: 'Primero Bachillerato Portoviejo' },
]

export const disciplines: Discipline[] = [
  { id: 'futbol', nombre: 'Fútbol', tipo: 'grupal', genero: 'M', sede: 'Cancha principal' },
  { id: 'basquet', nombre: 'Básquet', tipo: 'grupal', genero: 'M', sede: 'Coliseo norte' },
  { id: 'voley', nombre: 'Vóley', tipo: 'grupal', genero: 'F', sede: 'Coliseo sur' },
  { id: 'salto-alto', nombre: 'Salto alto', tipo: 'individual', genero: 'M', sede: 'Pista atlética' },
  { id: 'salto-largo', nombre: 'Salto largo', tipo: 'individual', genero: 'M', sede: 'Pista atlética' },
  { id: 'posta', nombre: 'Posta 4 × 100', tipo: 'individual', genero: 'M', sede: 'Pista atlética' },
  { id: 'ajedrez', nombre: 'Ajedrez', tipo: 'individual', genero: 'unisex', sede: 'Biblioteca' },
]

export const groupDisciplines = disciplines.filter((d) => d.tipo === 'grupal')
export const individualDisciplines = disciplines.filter((d) => d.tipo === 'individual')

export const athletes: Athlete[] = [
  { id: 'a-01', nombre: 'Mateo Alvarez', courseId: 'c-3a', genero: 'M' },
  { id: 'a-02', nombre: 'Diego Paredes', courseId: 'c-3b', genero: 'M' },
  { id: 'a-03', nombre: 'Santiago Ruiz', courseId: 'c-3c', genero: 'M' },
  { id: 'a-04', nombre: 'Emilio Vargas', courseId: 'c-2c', genero: 'M' },
  { id: 'a-05', nombre: 'Valentina Mora', courseId: 'c-3a', genero: 'F' },
  { id: 'a-06', nombre: 'Camila Torres', courseId: 'c-3b', genero: 'F' },
  { id: 'a-07', nombre: 'Sofia Herrera', courseId: 'c-3c', genero: 'F' },
  { id: 'a-08', nombre: 'Isabella Castro', courseId: 'c-2c', genero: 'F' },
  { id: 'a-09', nombre: 'Martin Aguirre', courseId: 'c-2a', genero: 'M' },
  { id: 'a-10', nombre: 'Joaquin Mendez', courseId: 'c-2b', genero: 'M' },
  { id: 'a-11', nombre: 'Luciana Paz', courseId: 'c-2a', genero: 'F' },
  { id: 'a-12', nombre: 'Fernanda Diaz', courseId: 'c-2b', genero: 'F' },
  { id: 'a-13', nombre: 'Andres Leon', courseId: 'c-1a', genero: 'M' },
  { id: 'a-14', nombre: 'Paula Rios', courseId: 'c-1b', genero: 'F' },
  { id: 'a-15', nombre: 'Nicolas Bravo', courseId: 'c-1c', genero: 'M' },
  { id: 'a-16', nombre: 'Daniela Soto', courseId: 'c-1d', genero: 'F' },
]

// Group standings per discipline (points feed the overall table).
export const groupStandings: Record<string, GroupStanding[]> = {
  futbol: [
    { courseId: 'c-3a', played: 3, won: 3, drawn: 0, lost: 0, points: 9 },
    { courseId: 'c-3b', played: 3, won: 2, drawn: 0, lost: 1, points: 6 },
    { courseId: 'c-3c', played: 3, won: 1, drawn: 0, lost: 2, points: 3 },
    { courseId: 'c-2c', played: 3, won: 0, drawn: 0, lost: 3, points: 0 },
  ],
  basquet: [
    { courseId: 'c-3b', played: 3, won: 3, drawn: 0, lost: 0, points: 9 },
    { courseId: 'c-3c', played: 3, won: 2, drawn: 0, lost: 1, points: 6 },
    { courseId: 'c-3a', played: 3, won: 1, drawn: 0, lost: 2, points: 3 },
    { courseId: 'c-2a', played: 3, won: 0, drawn: 0, lost: 3, points: 0 },
  ],
  voley: [
    { courseId: 'c-3c', played: 3, won: 3, drawn: 0, lost: 0, points: 9 },
    { courseId: 'c-3a', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { courseId: 'c-2a', played: 3, won: 1, drawn: 1, lost: 1, points: 4 },
    { courseId: 'c-2c', played: 3, won: 0, drawn: 0, lost: 3, points: 0 },
  ],
}

// Individual results keyed by discipline id. Marks are illustrative.
export const individualResults: Record<string, IndividualResult[]> = {
  'salto-alto': [
    { position: 1, athleteName: 'Mateo Alvarez', courseId: 'c-3a', genero: 'M', mark: '1.72 m' },
    { position: 2, athleteName: 'Santiago Ruiz', courseId: 'c-3c', genero: 'M', mark: '1.68 m' },
    { position: 3, athleteName: 'Martin Aguirre', courseId: 'c-2a', genero: 'M', mark: '1.65 m' },
    { position: 1, athleteName: 'Valentina Mora', courseId: 'c-3a', genero: 'F', mark: '1.55 m' },
    { position: 2, athleteName: 'Sofia Herrera', courseId: 'c-3c', genero: 'F', mark: '1.52 m' },
    { position: 3, athleteName: 'Luciana Paz', courseId: 'c-2a', genero: 'F', mark: '1.48 m' },
  ],
  'salto-largo': [
    { position: 1, athleteName: 'Diego Paredes', courseId: 'c-3b', genero: 'M', mark: '5.90 m' },
    { position: 2, athleteName: 'Emilio Vargas', courseId: 'c-2c', genero: 'M', mark: '5.72 m' },
    { position: 3, athleteName: 'Joaquin Mendez', courseId: 'c-2b', genero: 'M', mark: '5.60 m' },
    { position: 1, athleteName: 'Camila Torres', courseId: 'c-3b', genero: 'F', mark: '4.95 m' },
    { position: 2, athleteName: 'Isabella Castro', courseId: 'c-2c', genero: 'F', mark: '4.80 m' },
    { position: 3, athleteName: 'Fernanda Diaz', courseId: 'c-2b', genero: 'F', mark: '4.71 m' },
  ],
  posta: [
    { position: 1, athleteName: 'Equipo 3ro Cañar', courseId: 'c-3a', genero: 'M', mark: '48.20 s' },
    { position: 2, athleteName: 'Equipo 3ro Babahoyo', courseId: 'c-3c', genero: 'M', mark: '48.95 s' },
    { position: 3, athleteName: 'Equipo 2do Ibarra', courseId: 'c-2a', genero: 'M', mark: '49.40 s' },
    { position: 1, athleteName: 'Equipo 3ro Loja', courseId: 'c-3b', genero: 'F', mark: '54.10 s' },
    { position: 2, athleteName: 'Equipo 3ro Cañar', courseId: 'c-3a', genero: 'F', mark: '54.65 s' },
    { position: 3, athleteName: 'Equipo 2do Sucumbios', courseId: 'c-2b', genero: 'F', mark: '55.02 s' },
  ],
  ajedrez: [
    { position: 1, athleteName: 'Andres Leon', courseId: 'c-1a', genero: 'M', mark: '5.0 pts' },
    { position: 2, athleteName: 'Paula Rios', courseId: 'c-1b', genero: 'F', mark: '4.5 pts' },
    { position: 3, athleteName: 'Nicolas Bravo', courseId: 'c-1c', genero: 'M', mark: '4.0 pts' },
    { position: 4, athleteName: 'Daniela Soto', courseId: 'c-1d', genero: 'F', mark: '3.5 pts' },
  ],
}

// Points awarded by individual position (shared by all individual events).
export const INDIVIDUAL_POINTS: Record<number, number> = { 1: 7, 2: 5, 3: 3, 4: 1 }

// Conflict-free week fixtures (no course plays two matches at the same slot).
export const fixtures: Fixture[] = [
  { id: 'f-01', disciplineId: 'futbol', fecha: 'Lun', hora: '09:00', sede: 'Cancha principal', courseA: 'c-3a', courseB: 'c-3b' },
  { id: 'f-02', disciplineId: 'voley', fecha: 'Lun', hora: '10:30', sede: 'Coliseo sur', courseA: 'c-3c', courseB: 'c-2c' },
  { id: 'f-03', disciplineId: 'basquet', fecha: 'Mar', hora: '09:00', sede: 'Coliseo norte', courseA: 'c-3b', courseB: 'c-3c' },
  { id: 'f-04', disciplineId: 'futbol', fecha: 'Mar', hora: '10:30', sede: 'Cancha principal', courseA: 'c-2a', courseB: 'c-2b' },
  { id: 'f-05', disciplineId: 'voley', fecha: 'Mie', hora: '09:00', sede: 'Coliseo sur', courseA: 'c-1a', courseB: 'c-1b' },
  { id: 'f-06', disciplineId: 'basquet', fecha: 'Mie', hora: '10:30', sede: 'Coliseo norte', courseA: 'c-3a', courseB: 'c-2a' },
  { id: 'f-07', disciplineId: 'futbol', fecha: 'Jue', hora: '09:00', sede: 'Cancha principal', courseA: 'c-1c', courseB: 'c-1d' },
  { id: 'f-08', disciplineId: 'basquet', fecha: 'Jue', hora: '10:30', sede: 'Coliseo norte', courseA: 'c-3b', courseB: 'c-2c' },
  { id: 'f-09', disciplineId: 'voley', fecha: 'Vie', hora: '09:00', sede: 'Coliseo sur', courseA: 'c-3a', courseB: 'c-3c' },
  { id: 'f-10', disciplineId: 'ajedrez', fecha: 'Vie', hora: '10:30', sede: 'Biblioteca', courseA: 'c-1a', courseB: 'c-1b' },
]

export function courseName(id: string): string {
  const found = courses.find((c) => c.id === id)
  return found ? found.shortName : id
}

export function disciplineName(id: string): string {
  const found = disciplines.find((d) => d.id === id)
  return found ? found.nombre : id
}
