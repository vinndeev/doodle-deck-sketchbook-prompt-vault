import type { Prompt } from '../types'
const statusStripe: Record<string,string> = { 'untried':'bg-[#E5E0CC] border border-[#C9BFA0] border-dashed','in progress':'bg-[#F59E0B]','done':'bg-[#10B981]' }
const diffCls: Record<string,string> = { easy:'bg-[#E6F4EA] text-[#2E7D32] border-[#C8E6C9]', medium:'bg-[#FFF4CC] text-[#7A5A00] border-[#FFE69C]', hard:'bg-[#FCE8E6] text-[#9C2A1A] border-[#F8C9C5]' }
const styleCls: Record<string,string> = { pencil:'bg-[#F3F4F6] text-[#374151]', ink:'bg-[#111827] text-white', watercolor:'bg-[#E0F2FE] text-[#0C4A6E]', digital:'bg-[#EDE9FE] text-[#5B21B6]' }
const badgeCls: Record<string,string> = { 'untried':'bg-[#FDF6E3] border border-dashed border-[#C9BFA0] text-muted','in progress':'bg-[#FFFBEB] text-[#92400E] border border-[#FCD34D]','done':'bg-[#ECFDF5] text-[#065F46] border border-[#6EE7B7]' }

export function PromptCard({ p, onCycle, onDelete, highlight }: { p: Prompt; onCycle: (id:string)=>void; onDelete: (id:string)=>void; highlight?: boolean }) {
  return (
    <li
      onClick={()=>onCycle(p.id)}
      onKeyDown={e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); onCycle(p.id)}}}
      tabIndex={0} role="button" aria-label={`${p.text} — ${p.status}`}
      className={`card group relative ${highlight?'outline outline-2 outline-ink scale-[1.02]':''} ${p.status==='done'?'opacity-95':''}`}>
      <div className={`card-stripe ${statusStripe[p.status]}`} />
      <button aria-label={`Delete ${p.text}`} onClick={e=>{ e.stopPropagation(); onDelete(p.id)}}
        className="absolute top-2.5 right-2.5 w-7 h-7 grid place-items-center rounded-full border border-line bg-white text-muted hover:bg-[#FEF2F2] hover:text-[#B42318] text-lg leading-none">×</button>
      <p className="font-caveat text-[1.22rem] leading-[1.35] mr-6 break-words">"{p.text}"</p>
      <div className="flex gap-1.5 flex-wrap items-center mt-2">
        <span className={`text-[.7rem] font-extrabold tracking-wide uppercase px-2 py-1 rounded-full ${badgeCls[p.status]}`}>{p.status}</span>
        <span className={`text-[.72rem] font-bold uppercase px-2 py-1 rounded-full border ${diffCls[p.difficulty]}`}>{p.difficulty}</span>
        <span className={`text-[.72rem] font-bold uppercase px-2 py-1 rounded-full ${styleCls[p.style]}`}>{p.style}</span>
      </div>
      <span className="text-[.7rem] text-muted mt-1 block">click to cycle →</span>
    </li>
  )
}
