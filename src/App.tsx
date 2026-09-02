import { useEffect, useMemo, useState } from 'react'
import type { Prompt, Difficulty, Style } from './types'
import { load, save } from './lib/storage'
import { uid, nextStatus, filterPrompts, pickRandomUntried, validateText } from './lib/utils'
import { PromptCard } from './components/PromptCard'

const seeds: Omit<Prompt,'id'|'createdAt'>[] = [
  { text:'a lighthouse in a thunderstorm', difficulty:'hard', style:'ink', status:'untried' },
  { text:'robot eating ramen', difficulty:'easy', style:'digital', status:'untried' },
  { text:'cat astronaut on the moon', difficulty:'medium', style:'watercolor', status:'untried' },
  { text:'abandoned greenhouse at dusk', difficulty:'medium', style:'pencil', status:'untried' },
]

export default function App(){
  const [prompts,setPrompts]=useState<Prompt[]>(()=>{
    const l=load()
    if(l.length) return l
    return seeds.map(s=>({ ...s, id:uid(), createdAt:Date.now()+Math.random() } as Prompt))
  })
  const [fDiff,setFDiff]=useState('all')
  const [fStyle,setFStyle]=useState('all')
  const [text,setText]=useState('')
  const [diff,setDiff]=useState<Difficulty>('easy')
  const [style,setStyle]=useState<Style>('pencil')
  const [err,setErr]=useState<string|null>(null)
  const [spot,setSpot]=useState<Prompt|null>(null)
  const [highlight,setHighlight]=useState<string|null>(null)

  useEffect(()=>{ save(prompts) },[prompts])
  useEffect(()=>{ if(!load().length && prompts.length) save(prompts) },[])

  const filtered = useMemo(()=> filterPrompts(prompts,fDiff,fStyle).sort((a,b)=>b.createdAt-a.createdAt),[prompts,fDiff,fStyle])
  const cAll=prompts.length, cUnt=prompts.filter(p=>p.status==='untried').length, cProg=prompts.filter(p=>p.status==='in progress').length, cDone=prompts.filter(p=>p.status==='done').length

  const add = (e:React.FormEvent)=>{
    e.preventDefault()
    const v=validateText(text); if(v){ setErr(v); return }
    setErr(null)
    setPrompts(p=>[{ id:uid(), text:text.trim(), difficulty:diff, style, status:'untried', createdAt:Date.now()}, ...p])
    setText('')
  }
  const cycle=(id:string)=> setPrompts(p=>p.map(x=> x.id===id ? {...x, status: nextStatus(x.status)} : x))
  const del=(id:string)=> setPrompts(p=>p.filter(x=>x.id!==id))
  const surprise=()=>{
    const pk=pickRandomUntried(prompts)
    if(!pk) return
    setSpot(pk); setHighlight(pk.id)
    setTimeout(()=> document.querySelector(`[data-card="${pk.id}"]`)?.scrollIntoView({behavior:'smooth',block:'center'}),50)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 bg-paper/90 backdrop-blur border-b border-dashed border-line">
        <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center gap-4 flex-wrap">
          <div className="flex gap-3 items-center">
            <span className="w-10 h-10 grid place-items-center bg-paper2 border border-line rounded-xl -rotate-2 text-xl">✏️</span>
            <div>
              <h1 className="font-caveat text-3xl leading-none">Doodle Deck</h1>
              <p className="text-muted text-sm">Sketchbook Prompt Vault — save, filter, surprise.</p>
            </div>
          </div>
          <div className="text-sm text-muted bg-paper2 border border-line px-3 py-1.5 rounded-full">{cAll} prompts · {cUnt} untried · {cProg} in progress · {cDone} done</div>
        </div>
      </header>

      <section className="max-w-[1100px] mx-auto px-4 md:px-6 pt-5">
        <div className="flex flex-wrap gap-4 justify-between items-center bg-paper2 border border-line rounded-2xl p-4 shadow-[2px_3px_0_#E8E0C8]">
          <div>
            <h2 className="font-caveat text-2xl">Blank page? Tap deck.</h2>
            <p className="text-muted text-sm">We pick one untried prompt and pin it front-center.</p>
          </div>
          <button onClick={surprise} disabled={cUnt===0} title={cUnt===0?'Add untried prompts first':`Pick from ${cUnt} untried`}
            className="bg-ink text-paper px-6 py-3.5 rounded-full font-bold shadow-[2px_4px_0_#C9BFA0] hover:-translate-y-0.5 disabled:opacity-45 disabled:cursor-not-allowed disabled:translate-y-0 transition">🎲 Surprise Me</button>
        </div>
        <div aria-live="polite" className="sr-only">{spot?`Surprise: ${spot.text}`:''}</div>
      </section>

      <main className="max-w-[1100px] mx-auto px-4 md:px-6 py-5 grid gap-5 lg:grid-cols-[380px_1fr] items-start">
        <aside className="bg-white border border-line rounded-2xl p-4 shadow-[2px_3px_0_#E8E0C8] lg:sticky lg:top-[78px]">
          <h3 className="font-caveat text-xl mb-3">Add prompt</h3>
          <form onSubmit={add} noValidate className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted">Prompt text *</label>
              <input value={text} onChange={e=>setText(e.target.value)} maxLength={160} placeholder="e.g. robot eating ramen"
                className="mt-1.5 w-full p-3 border border-line rounded-xl bg-paper focus:outline-dashed focus:outline-2 focus:outline-ink" />
              {err && <div className="mt-2 text-sm text-[#B42318] bg-[#FEF3F2] border border-[#FECDCA] p-2 rounded-lg">{err}</div>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <fieldset className="border border-dashed border-line rounded-xl p-2 bg-paper2">
                <legend className="text-xs font-bold uppercase tracking-widest text-muted px-1">Difficulty</legend>
                {(['easy','medium','hard'] as const).map(v=>
                  <label key={v} className="flex gap-1.5 items-center text-sm cursor-pointer py-0.5"><input type="radio" name="difficulty" checked={diff===v} onChange={()=>setDiff(v)} /> {v}</label>
                )}
              </fieldset>
              <fieldset className="border border-dashed border-line rounded-xl p-2 bg-paper2">
                <legend className="text-xs font-bold uppercase tracking-widest text-muted px-1">Style</legend>
                {(['pencil','ink','watercolor','digital'] as const).map(v=>
                  <label key={v} className="flex gap-1.5 items-center text-sm cursor-pointer py-0.5"><input type="radio" name="style" checked={style===v} onChange={()=>setStyle(v)} /> {v}</label>
                )}
              </fieldset>
            </div>
            <button type="submit" className="w-full bg-ink text-paper rounded-full py-2.5 font-bold hover:opacity-95">+ Add to deck</button>
            <p className="text-xs text-muted">Click card to cycle status · untried → in progress → done</p>
          </form>

          <div className="flex gap-2 mt-4 flex-wrap">
            <label className="text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-1">Filter
              <select value={fDiff} onChange={e=>setFDiff(e.target.value)} className="ml-1 border border-line rounded-lg px-2 py-1.5 bg-white font-semibold normal-case tracking-normal text-sm">
                <option value="all">all difficulties</option><option value="easy">easy</option><option value="medium">medium</option><option value="hard">hard</option>
              </select>
            </label>
            <select value={fStyle} onChange={e=>setFStyle(e.target.value)} aria-label="Filter by style" className="border border-line rounded-lg px-2 py-1.5 bg-white font-semibold text-sm">
              <option value="all">all styles</option><option value="pencil">pencil</option><option value="ink">ink</option><option value="watercolor">watercolor</option><option value="digital">digital</option>
            </select>
          </div>
          <div className="text-sm text-muted mt-2">{cAll} total prompts</div>
        </aside>

        <section>
          {prompts.length===0 ? (
            <div className="text-center py-8 bg-paper2 border border-dashed border-line rounded-2xl"><div className="text-4xl mb-2">✏️📓</div><p>No prompts yet — add one above to start deck!</p></div>
          ) : filtered.length===0 ? (
            <div className="text-center py-8 bg-paper2 border border-dashed border-line rounded-2xl"><p>No matches — try different filter.</p><button onClick={()=>{setFDiff('all');setFStyle('all')}} className="mt-2 border border-line bg-white rounded-full px-4 py-1.5 font-bold">Clear filters</button></div>
          ) : (
            <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map(p=> <div key={p.id} data-card={p.id}><PromptCard p={p} onCycle={cycle} onDelete={del} highlight={highlight===p.id} /></div>)}
            </ul>
          )}
        </section>
      </main>

      {spot && (
        <div className="fixed inset-0 bg-[rgba(26,26,24,.45)] backdrop-blur-sm grid place-items-center p-4 z-50" onClick={e=>{ if(e.target===e.currentTarget) setSpot(null)}} role="dialog" aria-modal="true">
          <div className="bg-paper border border-line rounded-2xl p-5 max-w-[560px] w-full shadow-[6px_8px_0_rgba(0,0,0,.12)] relative">
            <button onClick={()=>setSpot(null)} aria-label="Close" className="absolute top-2.5 right-2.5 w-7 h-7 grid place-items-center rounded-full border border-line bg-white">×</button>
            <div className="text-line tracking-widest">〰〰〰</div>
            <h3 className="font-caveat text-2xl">Your prompt 🎨</h3>
            <div className={`mt-3 bg-white border border-line rounded-xl p-3.5 shadow-[2px_3px_0_#E8E0C8]`}>
              <div className={`h-1.5 rounded-full mb-3 ${spot.status==='untried'?'bg-[#E5E0CC] border border-dashed border-[#C9BFA0]': spot.status==='in progress'?'bg-[#F59E0B]':'bg-[#10B981]'}`} />
              <p className="font-caveat text-2xl leading-tight">"{spot.text}"</p>
              <div className="flex gap-1.5 flex-wrap mt-2">
                <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-white border border-line">{spot.difficulty}</span>
                <span className="text-xs font-bold uppercase px-2 py-1 rounded-full bg-ink text-white">{spot.style}</span>
                <span className="text-xs font-extrabold uppercase px-2 py-1 rounded-full bg-paper2 border border-line">{spot.status}</span>
              </div>
              <p className="text-sm text-muted mt-2">Go draw this one ✏️ — click card in grid to mark in progress</p>
            </div>
            <button onClick={()=>setSpot(null)} className="mt-3 w-full bg-ink text-paper rounded-full py-2.5 font-bold">Let's draw!</button>
          </div>
        </div>
      )}

      <footer className="max-w-[1100px] mx-auto px-4 text-center text-sm text-muted py-6">Local storage only · stays after refresh · handmade for doodlers</footer>
    </div>
  )
}
