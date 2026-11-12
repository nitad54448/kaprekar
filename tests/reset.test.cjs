const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].at(-1)[1];
function harness(){
  const nodes=new Map(),timers=[];
  const node=id=>{if(!nodes.has(id)){
    const n={value:'',children:[],style:{},addEventListener(){},focus(){},appendChild(el){this.children.push(el);}};
    Object.defineProperty(n,'innerHTML',{set(v){this.children=[];},get(){return '';}});nodes.set(id,n);
  }return nodes.get(id);};
  const ctx=vm.createContext({document:{getElementById:node,createElement:()=>({style:{}})},setTimeout:fn=>{timers.push(fn);}});
  vm.runInContext(script,ctx);
  return {ctx,node,timers,start(n){vm.runInContext(`numberInput.value='${n}';`,ctx);return ctx.startKaprekar();},
    count:()=>vm.runInContext('resultsDiv.children.length',ctx),async tick(){const fn=timers.shift();assert(fn);fn();await Promise.resolve();}};
}
test('reset during the first delay prevents old steps from returning',async()=>{
  const h=harness(),run=h.start('3524');h.ctx.reset();await h.tick();await run;assert.equal(h.count(),0);
});
test('reset during the completion delay prevents the old success message',async()=>{
  const h=harness(),run=h.start('6174');h.ctx.reset();await h.tick();await run;assert.equal(h.count(),0);
});
test('a new run does not mix with a cancelled generation',async()=>{
  const h=harness(),old=h.start('3524');h.ctx.reset();const fresh=h.start('6174');
  await h.tick();await old;assert.equal(h.count(),0);await h.tick();await fresh;assert.equal(h.count(),1);
});
test('normal run still reaches 6174 with its expected three steps',async()=>{
  const h=harness(),run=h.start('3524');while(h.timers.length)await h.tick();await run;assert.equal(h.count(),4);
});
