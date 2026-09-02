import type { Prompt, Status } from '../types'
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,6)
export const order: Status[] = ['untried','in progress','done']
export const nextStatus = (s: Status): Status => order[(order.indexOf(s)+1)%3]
export const filterPrompts = (list: Prompt[], fDiff: string, fStyle: string) =>
  list.filter(p => (fDiff==='all'||p.difficulty===fDiff) && (fStyle==='all'||p.style===fStyle))
export const pickRandomUntried = (list: Prompt[]): Prompt | null => {
  const pool = list.filter(p=>p.status==='untried')
  return pool.length ? pool[Math.floor(Math.random()*pool.length)] : null
}
export const validateText = (t: string): string | null => {
  const v=t.trim()
  if(!v) return "Prompt can't be empty"
  if(v.length>160) return "Max 160 characters"
  return null
}
export const escapeHtml = (s: string) => s.replace(/[&<>"']/g,c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]!))
