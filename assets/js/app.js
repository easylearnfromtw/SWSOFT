
(function(){'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const header=$('#site-header'),meter=$('#meter'),toggle=$('.menu-toggle'),mobile=$('#mobile-nav');
if(toggle&&mobile){function close(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','開啟選單');mobile.hidden=true;document.body.classList.remove('menu-open')}
toggle.addEventListener('click',function(){if(toggle.getAttribute('aria-expanded')==='true')close();else{toggle.setAttribute('aria-expanded','true');toggle.setAttribute('aria-label','關閉選單');mobile.hidden=false;document.body.classList.add('menu-open')}});
$$('a',mobile).forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
let queued=false;
function checkScroll(){queued=false;const y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;if(meter)meter.style.width=(h>0?Math.min(100,100*y/h):0)+'%';if(header){let dark=false;const key=innerHeight*.14;$$('[data-theme]').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<=key&&r.bottom>key)dark=el.dataset.theme==='dark'});header.classList.toggle('is-dark',dark);header.classList.toggle('is-solid',y>20)}}
addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(checkScroll)}},{passive:true});checkScroll();
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.11});$$('.partners-head,.logo-cell,.studio-head,.service-row,.people-panel,.module-heading,.history-main,.heritage-title,.heritage-chapter,.closing h2,.project-card,.service-card,.process-step').forEach(e=>{e.dataset.reveal='';io.observe(e)})}
const configs={
 booking:['01 — BOOKING SYSTEM','yourbrand.com / booking','預約管理','MAKE EVERY APPOINTMENT COUNT','本月預約','128','↗ 18.6%','今日預約','09','ON TRACK',[38,55,47,69,56,88,74,100,79,94]],
 content:['02 — CONTENT MANAGEMENT','yourbrand.com / studio','內容工作室','PUBLISH WITHOUT THE FRICTION','已發布文章','42','↗ 12.0%','待審草稿','06','IN REVIEW',[44,39,50,68,61,84,74,91,78,97]],
 members:['03 — MEMBER AREA','yourbrand.com / members','會員中心','BUILD CONNECTIONS THAT LAST','有效會員','864','↗ 24.2%','本週新會員','32','GROWING',[26,35,42,47,51,60,78,76,89,99]],
 analytics:['04 — DATA INSIGHTS','yourbrand.com / analytics','成效儀表板','UNDERSTAND WHAT ACTUALLY WORKS','本月訪問','8.4K','↗ 31.4%','轉換率','4.8%','+ 0.8 PT',[35,50,46,58,63,66,81,76,93,100]],
 custom:['05 — CUSTOM EXPERIENCE','yourbrand.com / experience','專屬系統','MADE FOR YOUR BUSINESS MODEL','工作流程','100%','CUSTOM FIT','系統模組','∞','CONNECTED',[65,44,81,57,100,49,79,65,93,87]]
};
function setModule(key){const t=configs[key],shell=$('#module-preview');if(!t||!shell)return;
$$('.module-tab').forEach(b=>{const yes=b.dataset.module===key;b.classList.toggle('is-active',yes);b.setAttribute('aria-selected',yes?'true':'false');b.tabIndex=yes?0:-1});
shell.setAttribute('aria-labelledby','tab-'+key);$('#mock-url').textContent=t[1];$('#module-caption').textContent=t[0];
$('#mock-content').innerHTML='<div class="mock-sidebar" aria-hidden="true"><div class="mock-logo">S<span>.</span></div><i></i><i></i><i></i><i></i></div><div class="mock-main"><p class="mock-sub">'+t[3]+'</p><h3>'+t[2]+'<span class="mock-spark">✳</span></h3><div class="mock-kpis"><div><small>'+t[4]+'</small><b>'+t[5]+'</b><span>'+t[6]+'</span></div><div><small>'+t[7]+'</small><b>'+t[8]+'</b><span>'+t[9]+'</span></div></div><div class="mock-bars" aria-label="示意數據圖表">'+t[10].map(n=>'<i style="height:'+n+'%"></i>').join('')+'</div></div>';}
$$('.module-tab').forEach((b,i,all)=>{b.addEventListener('click',()=>setModule(b.dataset.module));b.addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const next=(i+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+all.length)%all.length;all[next].focus();setModule(all[next].dataset.module)}})});
const form=$('#inquiry-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),get=k=>String(data.get(k)||'').trim(),name=get('name'),brand=get('brand');const subject='[SIGNWELL DESIGN 專案洽詢] '+(brand||name);const msg=['您好，SIGNWELL DESIGN. 團隊：','','我想洽詢網站設計／製作專案。','','聯絡人：'+name,'品牌／公司：'+(brand||'未提供'),'Email：'+get('email'),'需求類型：'+get('category'),'預估預算：'+(get('budget')||'尚未決定'),'','專案想法：',get('message'),'','——','由 SIGNWELL DESIGN. 網站建立的詢價郵件草稿'].join('\n');const status=$('#form-status');if(status)status.textContent='請在郵件應用程式確認內容並按「傳送」完成詢價。';window.location.href='mailto:luca.sinwell@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(msg)})}
})();
