import type { WeekDay } from '../data/mock'

const dayLabels: Record<WeekDay, string> = { Lun: 'Lunes', Mar: 'Martes', Mie: 'Miércoles', Jue: 'Jueves', Vie: 'Viernes' }
export const dayName = (day: WeekDay): string => dayLabels[day]
export const formatMark = (mark: string): string => mark.replace(/(\d)\.(\d)/g, '$1,$2')
