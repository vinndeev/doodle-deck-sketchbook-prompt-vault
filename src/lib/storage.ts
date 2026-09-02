import type { Prompt } from '../types'
const KEY = 'doodle-deck:v1'
export const load = (): Prompt[] => {
  try { const r = localStorage.getItem(KEY); return r ? (JSON.parse(r) as Prompt[]) : [] } catch { return [] }
}
export const save = (p: Prompt[]) => localStorage.setItem(KEY, JSON.stringify(p))
export const STORAGE_KEY = KEY
