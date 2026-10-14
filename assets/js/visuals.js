
/* SIGNWELL DESIGN. — generative WebGL orbit and history tunnel. */
(function(){'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const vs=`attribute vec2 pos; void main(){gl_Position=vec4(pos,0.,1.);}`;
const fs=`precision highp float;
uniform vec2 res;uniform vec2 mouse;uniform float tm;uniform float motion;uniform float mode;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float torus(vec3 p,vec2 t){return length(vec2(length(p.xz)-t.x,p.y))-t.y;}
float sphere(vec3 p,float r){return length(p)-r;}
float cube(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
vec2 map(vec3 p){
 p.x-=.76;p.xy*=rot(.11*sin(tm*.3));
 vec3 a=p;a.yz*=rot(tm*.24+.5);a.xy*=rot(tm*.13+.24);
 vec3 b=p;b.xy*=rot(-tm*.18+.64);b.yz*=rot(1.1);
 vec3 c=p;c.xy*=rot(tm*.09+.6);
 float ring1=torus(a,vec2(1.10,.14)),ring2=torus(b,vec2(.85,.054)),orb=sphere(p,.59);
 float boxy=cube(c-vec3(.23,0.,0.),vec3(.54));
 float d=min(ring1,ring2),id=ring1<ring2?1.:2.;
 if(orb<d){d=orb;id=3.;}if(boxy<d&&boxy>-.07){d=boxy;id=4.;}return vec2(d,id);
}
vec3 normalAt(vec3 p){float e=.002;return normalize(vec3(map(p+vec3(e,0,0)).x-map(p-vec3(e,0,0)).x,map(p+vec3(0,e,0)).x-map(p-vec3(0,e,0)).x,map(p+vec3(0,0,e)).x-map(p-vec3(0,0,e)).x));}
vec3 bg(vec2 uv){vec3 col=vec3(.022,.032,.082);col*=1.-.34*length(uv);vec2 grids=floor(uv*vec2(85.,70.));float stars=step(.994,hash(grids));vec2 f=fract(uv*vec2(85.,70.));float ds=1.-smoothstep(.04,.22,length(f-.5));col+=vec3(.24,.36,.65)*stars*ds*.7;col+=vec3(.06,.1,.26)*exp(-4.*length(uv-vec2(.42,.05)))*.375;return col;}
vec3 orbitScene(vec2 uv){vec3 col=bg(uv);vec3 ro=vec3(0.,0.,5.2),rd=normalize(vec3(uv.x*1.12,uv.y*1.12,-2.2));float t=0.;vec2 obj=vec2(0.);bool hit=false;
for(int i=0;i<56;i++){vec3 p=ro+rd*t;obj=map(p);if(obj.x<.003){hit=true;break;}t+=obj.x*.76;if(t>13.)break;}
if(hit){vec3 p=ro+rd*t,n=normalAt(p),light=normalize(vec3(-.5,1.3,2.5));float dif=max(dot(n,light),0.),rim=pow(1.-max(dot(n,-rd),0.),2.4);
vec3 base=obj.y<1.5?vec3(.32,.42,.98):obj.y<2.5?vec3(.87,.97,.34):obj.y<3.5?vec3(.13,.24,.55):vec3(.63,.76,.96);
float spec=pow(max(dot(reflect(-light,n),-rd),0.),38.),groove=sin(p.y*25.+p.x*15.)*.035;
vec3 surface=base*(.21+dif*.69+groove)+spec*vec3(1.,1.,.9)*.92+rim*vec3(.7,.92,1.)*.65;col=mix(surface,col,1.-exp(-.0017*t*t*t));}
return col;}
vec3 tunnelScene(vec2 uv){vec2 p=uv;p.x-=.37;p*=1.22;float a=atan(p.y,p.x),r=length(p)+.001,flow=tm*.2;vec3 col=vec3(.013,.019,.055);float depth=7.8/(r+.34),lines=pow(1.-abs(sin(depth*2.-flow*2.5+a*.33)),36.),cables=pow(abs(sin(a*9.+.11*sin(depth))),24.),tunnel=lines*(.2+.8*cables);vec3 blue=vec3(.10,.27,.95),lime=vec3(.76,.98,.23);col+=mix(blue,lime,.5+.5*sin(depth*.6+flow))*(tunnel*.9);col+=blue*pow(lines,3.)*.33;col+=lime*exp(-18.*abs(r-.50-.04*sin(tm*.31)))*.22;col+=vec3(.15,.18,.40)*exp(-8.*r);vec2 st=floor((uv+tm*.004)*vec2(128.,94.));float star=step(.986,hash(st));col+=vec3(.46,.57,1.)*star*(.17+.83*hash(st+14.));col+=.004*hash(floor(uv*vec2(30.)));return col;}
void main(){vec2 uv=(gl_FragCoord.xy-.5*res)/res.y;vec3 c=mode<.5?orbitScene(uv):tunnelScene(uv);c=c/(1.+c*.35);c=pow(max(c,0.),vec3(.91));gl_FragColor=vec4(c,1.);}
`;
const canvases=['visual-canvas','history-canvas'].map(id=>document.getElementById(id)).filter(Boolean);if(!canvases.length)return;
let items=[];for(const canvas of canvases){let gl;try{gl=canvas.getContext('webgl',{antialias:false,alpha:false,depth:false,preserveDrawingBuffer:false,powerPreference:'low-power'})}catch(e){}
if(!gl){canvas.classList.add('no-webgl');continue;}
function compile(t,s){let sh=gl.createShader(t);gl.shaderSource(sh,s);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS)){console.warn('WebGL fallback:',gl.getShaderInfoLog(sh));gl.deleteShader(sh);return null}return sh}
const v=compile(gl.VERTEX_SHADER,vs),f=compile(gl.FRAGMENT_SHADER,fs);if(!v||!f){canvas.classList.add('no-webgl');continue}
const prog=gl.createProgram();gl.attachShader(prog,v);gl.attachShader(prog,f);gl.linkProgram(prog);if(!gl.getProgramParameter(prog,gl.LINK_STATUS)){canvas.classList.add('no-webgl');continue}
const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
gl.useProgram(prog);const loc=gl.getAttribLocation(prog,'pos');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
const u={res:gl.getUniformLocation(prog,'res'),tm:gl.getUniformLocation(prog,'tm'),mode:gl.getUniformLocation(prog,'mode'),mouse:gl.getUniformLocation(prog,'mouse'),motion:gl.getUniformLocation(prog,'motion')};
items.push({canvas,gl,prog,buffer,loc,u,kind:canvas.id==='history-canvas'?1:0,visible:false,drawn:false,w:0,h:0});canvas.classList.add('ready')}
if(!items.length)return;
function draw(item,time){const{canvas,gl,prog,buffer,loc,u}=item,r=canvas.getBoundingClientRect();if(r.width<1||r.height<1)return;const dpr=Math.min(devicePixelRatio||1,item.kind?.86:(innerWidth<800?.76:.78),1250/Math.max(1,r.width));const w=Math.max(1,Math.round(r.width*dpr)),h=Math.max(1,Math.round(r.height*dpr));
if(w!==item.w||h!==item.h){canvas.width=w;canvas.height=h;item.w=w;item.h=h;gl.viewport(0,0,w,h)}gl.useProgram(prog);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);gl.uniform2f(u.res,w,h);gl.uniform1f(u.mode,item.kind);gl.uniform1f(u.tm,reduced?0:time);gl.uniform2f(u.mouse,0,0);gl.uniform1f(u.motion,reduced?0:1);gl.drawArrays(gl.TRIANGLES,0,6);item.drawn=true;}
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(e=>{const x=items.find(i=>i.canvas===e.target);if(x)x.visible=e.isIntersecting}),{rootMargin:'15%'});items.forEach(i=>io.observe(i.canvas))}else items.forEach(x=>x.visible=true);
let last=0;function frame(now){requestAnimationFrame(frame);if(document.hidden)return;const fps=innerWidth<800?22:30;if(now-last<1000/fps)return;last=now;for(const item of items)if(item.visible&&(!reduced||!item.drawn))draw(item,Math.min(now/1000,1e6))}
requestAnimationFrame(frame);document.addEventListener('visibilitychange',()=>{if(!document.hidden)items.forEach(x=>x.drawn=false)});addEventListener('resize',()=>items.forEach(x=>x.drawn=false),{passive:true});
})();
