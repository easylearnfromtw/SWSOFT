/* SIGNWELL DESIGN. — progressively enhanced experience & lead capture. */
(()=>{'use strict';
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const home=document.body.dataset.page==='home';
const main=$('#main');
let raf=0;
function onFrame(fn){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;fn()})}
if(home&&main){
 const stages=[
  ['intro','OPENING'],['universe','IMMERSIVE STUDIO'],['partners','BRANDS'],
  ['modules','DIGITAL MODULES'],['history','OUR STORY'],['heritage','THE FUTURE']
 ];
 const rail=document.createElement('nav');rail.className='experience-rail';rail.setAttribute('aria-label','六幕快速導覽');
 rail.innerHTML=stages.map(([id,label],i)=>'<a href="#'+id+'" aria-label="第 '+(i+1)+' 幕，'+label+'"><span class="rail-text">'+label+'</span><span class="rail-mark" aria-hidden="true"></span><span class="rail-label">'+String(i+1).padStart(2,'0')+'</span></a>').join('');
 document.body.append(rail);
 const links=$$('a',rail);
 const quick=document.createElement('a');quick.className='quick-inquiry';quick.href='contact.html';quick.textContent='洽談網站專案 ↗';quick.setAttribute('aria-label','前往網站設計詢價');
 document.body.append(quick);
 const mock=$('#module-preview');
 const panel=$('.module-display');
 const end=$('#contact');
 const activeSection=()=>{
  let stage=0;const line=innerHeight*.39;
  stages.forEach(([id],i)=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<=line)stage=i});
  links.forEach((a,i)=>{if(i===stage)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current')});
  const section=document.getElementById(stages[stage][0]);
  const theme=section?.dataset.theme==='dark'||(stage===1||stage===3||stage===5);
  rail.classList.toggle('is-dark',theme);
  const away=window.scrollY>innerHeight*.6;
  const nearingEnd=end&&end.getBoundingClientRect().top<innerHeight*.75;
  quick.classList.toggle('is-shown',away&&!nearingEnd);
 };
 const check=()=>onFrame(activeSection);
 addEventListener('scroll',check,{passive:true});addEventListener('resize',check,{passive:true});activeSection();
 if(mock&&panel&&!reduced.matches&&matchMedia('(hover:hover) and (pointer:fine)').matches){
  let tid=0;
  const move=e=>{if(!tid)tid=requestAnimationFrame(()=>{
   tid=0;const b=panel.getBoundingClientRect();const x=Math.min(1,Math.max(0,(e.clientX-b.left)/b.width))-.5;const y=Math.min(1,Math.max(0,(e.clientY-b.top)/b.height))-.5;
   mock.style.setProperty('--swd-tilt-x',(-y*9).toFixed(2)+'deg');
   mock.style.setProperty('--swd-tilt-y',(x*12).toFixed(2)+'deg');
   mock.classList.add('is-tilting');
  })};
  panel.addEventListener('pointermove',move,{passive:true});
  panel.addEventListener('pointerleave',()=>{if(tid)cancelAnimationFrame(tid);tid=0;mock.classList.remove('is-tilting');mock.style.removeProperty('--swd-tilt-x');mock.style.removeProperty('--swd-tilt-y')});
 }
 const shortcuts=document.createElement('div');shortcuts.className='project-shortcuts';
 shortcuts.setAttribute('aria-label','快速選擇網站設計需求');
 shortcuts.innerHTML='<span>WHAT ARE YOU BUILDING?</span>'+
 [
  ['品牌形象網站','品牌／企業形象網站'],
  ['3D 互動網站','互動式／3D 網站'],
  ['客製化系統','會員、預約或商業模組']
 ].map(([name,value])=>'<a href="contact.html?service='+encodeURIComponent(value)+'">'+name+' ↗</a>').join('');
 const actions=$('.closing-actions');
 if(actions)actions.before(shortcuts);
 const caption=$('#module-caption');if(caption)caption.setAttribute('aria-live','polite');
 const moduleLinks=$$('.module-tab');
 moduleLinks.forEach(tab=>tab.addEventListener('click',()=>{
  const current=tab.dataset.module||'booking';
  const display=$('.module-display');
  if(display)display.dataset.variant=current;
 }));
 const first=$('.module-tab.is-active');if(first){const display=$('.module-display');if(display)display.dataset.variant=first.dataset.module}
}
/* Homepage quick choice flows into a preselected inquiry category, without storing visitor data. */
if(document.body.dataset.page==='contact'){
 const select=$('#category');const wanted=new URLSearchParams(location.search).get('service');
 if(select&&wanted&&Array.from(select.options).some(o=>o.value===wanted)){select.value=wanted}
 const form=$('#inquiry-form');
 if(form){
  const button=document.createElement('button');button.type='button';button.className='copy-inquiry';button.innerHTML='複製詢價內容 <span aria-hidden="true">⧉</span>';
  const status=$('#form-status');const send=$('.form-send',form);
  if(send)send.after(button);
  const format=()=>{
   const data=new FormData(form),get=k=>String(data.get(k)||'').trim();
   return [
    'SIGNWELL DESIGN.｜網站製作洽詢','',
    '聯絡人：'+get('name'),
    '品牌／公司：'+(get('brand')||'未提供'),
    'Email：'+get('email'),
    '需求類型：'+get('category'),
    '預估預算：'+(get('budget')||'尚未決定'),
    '','專案想法：',get('message')
   ].join('\n');
  };
  button.addEventListener('click',async()=>{
   if(!form.reportValidity())return;
   const text=format();
   try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
    else{
     const field=document.createElement('textarea');field.value=text;field.style.position='fixed';field.style.opacity='0';document.body.append(field);field.select();
     if(!document.execCommand('copy'))throw new Error('copy unavailable');field.remove();
    }
    if(status)status.textContent='已複製詢價內容，可以貼到你的 Email 或其他聯絡工具。';
   }catch(e){if(status)status.textContent='裝置未允許複製，請使用「建立詢價郵件」或直接寄信給我們。'}
  });
 }
}
})();
