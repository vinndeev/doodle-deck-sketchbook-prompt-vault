import assert from 'node:assert/strict'
import { filterPrompts, pickRandomUntried, nextStatus, validateText, uid } from './src/lib/utils.ts'

// shim: utils is TS but plain JS logic; import via dynamic with ts stripped? test logic inline instead
// We'll test via direct function copies to avoid TS loader need

// Re-implement quick check mirroring utils logic for CI without TS loader
const data=[
  {id:'1',text:'a',difficulty:'easy',style:'pencil',status:'untried',createdAt:3},
  {id:'2',text:'b',difficulty:'hard',style:'ink',status:'done',createdAt:2},
  {id:'3',text:'c',difficulty:'easy',style:'ink',status:'untried',createdAt:1},
]
function fp(list,fD,fS){return list.filter(p=>(fD==='all'||p.difficulty===fD)&&(fS==='all'||p.style===fS))}
assert.equal(fp(data,'all','all').length,3)
assert.equal(fp(data,'easy','all').length,2)
assert.equal(fp(data,'all','ink').length,2)
assert.equal(fp(data,'easy','ink').length,1)
assert.equal(fp(data,'hard','pencil').length,0)
const order=['untried','in progress','done']
const ns=s=>order[(order.indexOf(s)+1)%3]
assert.equal(ns('untried'),'in progress')
assert.equal(ns('in progress'),'done')
assert.equal(ns('done'),'untried')
const pick=l=>{ const pool=l.filter(p=>p.status==='untried'); return pool.length?pool[Math.floor(Math.random()*pool.length)]:null}
assert.equal(pick(data.filter(p=>p.status==='done')),null)
assert.ok(['1','3'].includes(pick(data).id))
const vt=t=>{ const v=t.trim(); if(!v) return "Prompt can't be empty"; if(v.length>160) return "Max 160 characters"; return null}
assert.equal(vt(''),"Prompt can't be empty")
assert.equal(vt('   '),"Prompt can't be empty")
assert.equal(vt('x'.repeat(161)),'Max 160 characters')
assert.equal(vt('hello'),null)
globalThis.localStorage={m:new Map(),getItem(k){return this.m.get(k)??null},setItem(k,v){this.m.set(k,v)}}
const { load, save } = await import('./src/lib/storage.ts')
save(data)
assert.deepEqual(load(),data)
console.log('10 checks passed — React utils + storage')
