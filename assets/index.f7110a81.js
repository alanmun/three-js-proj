import{M as e,G as t,a as n,b as o,C as a,c as i,d as s,O as r,e as l,R as d,V as c,S as w,f as m,B as h,A as p,g as u,P as g,W as y,h as b,T as f,i as v,j as M,k as D,D as A,l as k,m as I,n as T,o as x,p as C,q as E,r as S,s as z,t as j,u as G,v as L,E as F,L as N}from"./vendor.19f9a09e.js";var R;class B{constructor(o,a,i,s=null){this.isGroup=!1,this.distance=0,this.tilt=e.randInt(-70,10),this.theta=e.randFloat(0,6.28318530718),this.cameraIsAt=!1,this.entity=null,this.entityCloseUp=null,null!=s?this.entity=s:this.isGroup?this.entity=new t:this.entity=new n,this.entity.name=o,this.isGroup=a,this.distance=i}swapEntities(e){!1===this.cameraIsAt?(e.remove(this.entity),e.add(this.entityCloseUp),this.cameraIsAt=!0):(e.remove(this.entityCloseUp),e.add(this.entity),this.cameraIsAt=!1)}addMesh(e,t){this.isGroup?this.entity.add(new n(e,t)):(this.entity.geometry=e,this.entity.material=t)}setCloseUp(e){this.entityCloseUp=e,this.entityCloseUp.name=this.entity.name+" close"}rotate(e,t,n){this.entity.rotation.x+=e,this.entity.rotation.y+=t,this.entity.rotation.z+=n}adjustOrbit(){let e;e=this.cameraIsAt?this.entityCloseUp:this.entity;e.position.x=this.distance*Math.cos(this.theta),e.position.y=this.distance*Math.sin(this.theta),e.position.z=this.tilt*Math.sin(this.theta),this.theta+=1/(4*this.distance**1.5)}addGrass(e,t,a,i,s){let r=s.clone(!0);return r.position.set(e,t,a),r.traverse((function(e){e instanceof n&&(e.material=new o({color:i}))})),this.entityCloseUp.add(r),r}addTree(t,l=0,d,c){const w=e.randFloat(.5,1),m=new a(.1,.1,w,12),h=new i({color:"brown"}),p=new s(.4,2*w,12),u=new o({color:null!=c?c:"green"}),g=new r;g.add(new n(m,h));const y=new n(p,u);return y.position.y=3*w/2,g.add(y),void 0===t?g.position.x-=e.randFloat(7,15):g.position.x=t,g.position.y=l,void 0===d?g.position.z-=e.randFloat(-6,6.75):g.position.z=d,this.entityCloseUp.add(g),g}reverberate(t){if("blackhole"==this.entity.name){let n=.5*Math.sin(t)+.5;const o=new l("#BAD1FF"),a=new l("#FFFFFF");let i;return this.entity.material.uniforms.glowColor.value=o.lerp(a,n),i=e.randInt(1,10)>8?.4:0,t+i}return 0}setName(e){this.entity.name=e}getName(){return this.entity.name}}!function(e){e.mode=!1;let t=.1,n=.5;e.debuggerKeys=function(t,n){if(e.mode)switch(n){case 78:t.rotation.y+=.1,console.log(t.rotation);break;case 77:t.rotation.y-=.1,console.log(t.rotation);break;case 74:t.rotation.x+=.1,console.log(t.rotation);break;case 75:t.rotation.x-=.1,console.log(t.rotation);break;case 85:t.rotation.z+=.1,console.log(t.rotation);break;case 73:t.rotation.z-=.1,console.log(t.rotation);break;case 98:e.yMin(t);break;case 101:e.yPos(t);break;case 99:e.zMin(t);break;case 102:e.zPos(t);break;case 104:e.xMin(t);break;case 105:e.xPos(t);break;case 107:e.adjSens(1);break;case 109:e.adjSens(-1)}},e.adjSens=function(o){e.mode&&(n+=.1*o,t+=.01*o,console.log(`Positional sensitivity is now ${n}. \n Orientational sensitivity is now ${t}`))},e.xPos=function(t){e.mode&&(t.position.x+=n,console.log(t.position))},e.xMin=function(t){e.mode&&(t.position.x-=n,console.log(t.position))},e.yPos=function(t){e.mode&&(t.position.y+=n,console.log(t.position))},e.yMin=function(t){e.mode&&(t.position.y-=n,console.log(t.position))},e.zPos=function(t){e.mode&&(t.position.z+=n,console.log(t.position))},e.zMin=function(t){e.mode&&(t.position.z-=n,console.log(t.position))}}(R||(R={}));const Q="\nuniform vec3 viewVector;\nuniform float c;\nuniform float p;\nvarying float intensity;\nvoid main() \n{\n    vec3 vNormal = normalize( normalMatrix * normal );\n\tvec3 vNormel = normalize( normalMatrix * viewVector );\n\tintensity = pow( c - dot(vNormal, vNormel), p );\n\t\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",U="\nuniform vec3 glowColor;\nvarying float intensity;\nvoid main() \n{\n\tvec3 glow = glowColor * intensity;\n    gl_FragColor = vec4(glow, 1.0);\n}\n";var O,P;let V,H,W,X,Z,K,J,Y,q,_,$,ee,te;(P=O||(O={}))[P.spawn=0]="spawn",P[P.blackHole=1]="blackHole",P[P.twitter=2]="twitter",P[P.autosage=3]="autosage",P[P.moon=4]="moon";var ne=new Audio("/assets/distantboom.4ae5851f.wav");ne.muted=!0,ne.volume=.6;var oe=new Audio("/assets/zoomoutmodified.a85b619f.wav");oe.volume=.6,oe.muted=!0;var ae=new Audio("/assets/background.dd42b1f0.mp3");ae.volume=.65,ae.muted=!0;var ie=!1,se=!1,re=!1,le=!1,de=!1,ce=new d,we=new c;const me={x:0,y:0,z:360};let he={isLocked:!1,target:null,name:0};const pe={isLocked:!0,target:{position:me},name:0};function ue(e){if(e.preventDefault(),e.target==document.getElementById("soundbutton"))return ae.play(),ae.muted=!ae.muted,oe.muted=!oe.muted,ne.muted=!ne.muted,void(oe.muted?document.getElementById("soundbutton").src="/assets/muted.55725545.png":document.getElementById("soundbutton").src="/assets/unmuted.a6fc9037.png");we.x=e.clientX/window.innerWidth*2-1,we.y=-e.clientY/window.innerHeight*2+1,ce.setFromCamera(we,W);var t=ce.intersectObjects(H.children,!0);console.log(t[0].object.name),console.log(t[0].object),he.isLocked&&!de||(de&&"skybox"==t[0].object.name?ge():!de&&ce.ray.intersectsBox((new L).setFromObject($.entity))?(console.log("Hit detected on autosage world (not close up)"),ne.play(),V.enabled=!1,he={isLocked:!0,target:$.entity,name:3}):!de&&ce.ray.intersectsBox((new L).setFromObject(Z.entity))?(console.log("Hit detected on twitter world (not close up)"),ne.play(),V.enabled=!1,he={isLocked:!0,target:Z.entity,name:2}):de||"moon"!=t[0].object.name||(ne.play(),V.enabled=!1,he={isLocked:!0,target:te.entity,name:4}))}function ge(){ve(!1),fe(he.name,!0),he=pe,oe.play()}function ye(e){document.getElementById("portfolioDiv").style.visibility="visible";let t=document.getElementById("title"),n=document.getElementById("spanBody");switch(e){case 2:t.innerHTML="What Song Is That? (2020)",n.innerHTML='I decided to write and host a twitter bot for fun on my own server, using a Raspberry Pi, for a friend\'s twitter account. That bot has over a hundred thousand followers now. The success of that bot led me to make my own more sophisticated bot called What Song Is That? It takes requests from users who wish to know what song is playing in a tweet, queries Shazam\'s API on their behalf and displays its findings cleanly on a website I made for it. Check out <a style="text-decoration:none; color:salmon;" href="https://whatsong.page" target="_blank">whatsong.page</a> for more information.';break;case 3:t.innerHTML="AutoSage (2021)",n.innerHTML='AutoSage is a Python written tool for users of BeatSage, an AI driven service made for the popular VR rhythm game Beat Saber. AutoSage simplifies and automates the process of using BeatSage for all of the songs the user wishes to play in Beat Saber. See the tool\'s repo here: <a style="text-decoration:none; color:salmon;" href="https://github.com/alanmun/autosage" target="_blank">github.com/alanmun/autosage</a>';break;case 4:t.innerHTML="3D Interactive Portfolio (2021)",n.innerHTML='This portfolio is written in typescript using the three.js 3D graphics library and deployed using vite. My work on the AutoSage tool led me to discovering three.js. I was enamoured with the library and had to make something with it. I had always wanted a cool way to show my personal technological efforts and projects so I decided to represent them in their own worlds that can be visited by interacting with them. I learned more from undertaking this project than any other personal project I\'ve ever worked on. I had never written three.js code before, my HTML and CSS skills have definitely improved since beginning, and I gave myself an introduction to shaders and 3D modelling in blender by creating the Beat Saber cube that is floating in space. This portfolio remains a continual work in progress as I plan to update it with new worlds for every technological endeavor I go on. See the repo here: <a style="text-decoration:none; color:salmon;" href="https://github.com/alanmun/3D-Interactive-Portfolio" target="_blank">github.com/alanmun/3D-Interactive-Portfolio</a>';break;default:console.log("Unknown case in addText")}}function be(){document.getElementById("portfolioDiv").style.visibility="hidden"}function fe(e,t){switch(t?(de=!1,W.rotation.set(0,0,0),Z.distance/=1,$.distance/=1.5,te.distance/=2):(de=!0,W.rotation.set(0,1.57,0),Z.distance*=1,$.distance*=1.5,te.distance*=2),e){case 1:break;case 4:t?(te.swapEntities(H),be()):(te.swapEntities(H),ye(e),he.target=te.entityCloseUp);break;case 2:t?(Z.swapEntities(H),be()):(Z.swapEntities(H),ye(e),he.target=Z.entityCloseUp);break;case 3:t?($.swapEntities(H),be()):($.swapEntities(H),ye(e),he.target=$.entityCloseUp);break;default:console.log("DEFAULT TRIGGERED!?!?!?!?")}}function ve(e=!0,t="730ms"){var n=document.getElementById("bg");return n.style.transitionDuration=t,n.style.opacity=e?"0":"1",!1}function Me(e,t){let n=.5*e.parameters.width,o=new c(-n,0),a=new c(0,t),i=new c(n,0),s=(new c).subVectors(o,a),r=(new c).subVectors(a,i),l=(new c).subVectors(o,i),d=s.length()*r.length()*l.length()/(2*Math.abs(s.cross(l))),w=new c(0,t-d),m=2*((new c).subVectors(o,w).angle()-.5*Math.PI),h=e.attributes.uv,p=e.attributes.position,u=new c;for(let c=0;c<h.count;c++){let e=1-h.getX(c),t=p.getY(c);u.copy(i).rotateAround(w,m*e),p.setXYZ(c,u.x,t,-u.y)}p.needsUpdate=!0}function De(e){var t=e.which;if(32==t||27==t){if(0==he.name)return;if(he.isLocked&&!de)return;ge()}R.debuggerKeys(W,t)}function Ae(e){e.target.remove()}function ke(){W.aspect=window.innerWidth/window.innerHeight,W.updateProjectionMatrix(),X.setSize(window.innerWidth,window.innerHeight)}(new class{addStar(t=!1){let o,a=e.randFloat(.75,.95);switch(e.randInt(1,8)){case 1:o=new l("#2407FF");break;case 2:o=new l("#FFB200");break;default:o=new l("white")}const i=new w(a,16,16),s=new m({uniforms:{glowColor:{value:o},p:{value:3},c:{value:.5},viewVector:{value:W.position}},vertexShader:Q,fragmentShader:U,side:h,blending:p,transparent:!0}),r=new n(i,s);let d,c,u,g,y,b;g=0==e.randInt(0,1)?-1:1,y=0==e.randInt(0,1)?-1:1,b=t||0==e.randInt(0,1)?-1:1;const f=700;d=e.randFloat(0,g*f),u=e.randFloat(0,b*f),c=Math.abs(u)>380||Math.abs(d)>380?e.randFloat(0,y*f):e.randFloat(380*y,y*f),r.position.set(d,c,u),r.name="star",H.add(r)}pinCameraToWorld(e){W.position.set(e.position.x,e.position.y+8,e.position.z)}adjustCamera(e){const t=W.position.x-e.position.x,n=W.position.y-e.position.y,o=W.position.z-e.position.z,a=.08,i=.05,s=.025,r=.05;let l=Math.abs(t);l>18?W.position.x-=t*a:l>5?(W.position.x-=t*i,ie=!0):l>1?(W.position.x-=t*s,ie=!0):l>.03?(W.position.x-=Math.sign(t)*r,ie=!0):l>=0&&(W.position.x=e.position.x,ie=!0);let d=Math.abs(n);d>18?W.position.y-=n*a:d>5?(W.position.y-=n*i,se=!0):d>1?(W.position.y-=n*s,se=!0):d>.03?(W.position.y-=Math.sign(n)*r,se=!0):d>=0&&(W.position.y=e.position.y,se=!0);let c=Math.abs(o);c>18?W.position.z-=o*a:c>5?(W.position.z-=o*i,re=!0):c>1?(W.position.z-=o*s,re=!0):c>.03?(W.position.z-=Math.sign(o)*r,re=!0):c>=0&&(W.position.z=e.position.z,re=!0),W.position.x==me.x&&W.position.y==me.y&&W.position.z==me.z?(he={isLocked:!1,target:null,name:0},V.enabled=!0,console.log("Matched at spawn: "+W.position.x+"  "+me.x),ie=!1,se=!1,re=!1,le=!1):ie&&se&&re&&!le&&(ve(),setTimeout((function(){fe(he.name,!1),ve(!1)}),1e3),le=!0)}init(){let a;H=new u,W=new g(35,window.innerWidth/window.innerHeight,.1,5e3),X=new y({canvas:document.querySelector("#bg"),logarithmicDepthBuffer:!1,antialias:!0}),X.setPixelRatio(window.devicePixelRatio),X.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(X.domElement),V=new b(W,X.domElement),V.rotateSpeed=.45,V.minDistance=50,V.maxDistance=370,V.enableZoom=!0,V.enablePan=!1;const s=new N((()=>{console.log("Loaded skybox"),a=new n(d,c),a.name="skybox",H.add(a),K.add(J),K.add(Y),K.add(q),Z.addGrass(-13.5,3.7,-9,4088477,_),Z.addGrass(-17.6,2.9,-7,3626634,_),Z.addGrass(-15.6,2.9,-6.5,3626634,_),Z.addGrass(-14.1,3.4,9.1,3626634,_),Z.addGrass(-16.6,2.8,-7.3,3626634,_),Z.addGrass(-17.5,2.8,-8.3,3626634,_);const e=document.querySelector("#loading-screen");null==e||e.classList.add("fade-out"),null==e||e.addEventListener("transitionend",Ae),W.position.set(0,400,1200),V.enabled=!1,he=pe,le=!0})),r=new f(s);let d=new v(2100,2100,2100),c=[new M({map:r.load("/assets/right.19f9b8b4.png")}),new M({map:r.load("/assets/left.06e25816.png")}),new M({map:r.load("/assets/top.14e60ce3.png")}),new M({map:r.load("/assets/bottom.8560bb79.png")}),new M({map:r.load("/assets/front.e060fa56.png")}),new M({map:r.load("/assets/back.1d924bd0.png")})];c.forEach((e=>e.side=h)),window.addEventListener("touch",ue,!1),window.addEventListener("click",ue,!1),window.addEventListener("keydown",De,!1),window.addEventListener("resize",ke,!1);let L=new f(s).load("/assets/moon.b246064f.jpg"),O=new f(s).load("/assets/moonbumpmap.8e277ece.jpg");new D(s).load("/assets/block.c03dc9a6.glb",(function(a){$=new B("autosage",!0,85,a.scene);let s=$.entity;s.scale.set(7,7,7);let r=!0;s.traverse((function(e){e instanceof n&&(r?(r=!1,e.material=new i({color:"#cc0000",shininess:1,flatShading:!0})):e.material=new i({color:"#ffffff",flatShading:!0,side:A}))})),H.add($.entity),ee=new t;const l=new k;var d,c,w,m,p,u;c=0,w=0,m=50,p=100,u=10,(d=l).moveTo(c,w+u),d.lineTo(c,w+p-u),d.quadraticCurveTo(c,w+p,c+u,w+p),d.lineTo(c+m-u,w+p),d.quadraticCurveTo(c+m,w+p,c+m,w+p-u),d.lineTo(c+m,w+u),d.quadraticCurveTo(c+m,w,c+m-u,w),d.lineTo(c+u,w),d.quadraticCurveTo(c,w,c,w+u);let g=new I(l);g.center();let y=new o({color:"red",metalness:.1});y.side=h;let b=new n(g,y);b.rotation.x+=90*e.DEG2RAD,b.rotation.z+=90*e.DEG2RAD,ee.add(b),$.setCloseUp(ee);let f=new t;f=s.clone(!0),f.position.set(-40,1,-15),f.scale.set(1,1,1),f.name="miniblock1",f.rotation.y+=60*e.DEG2RAD,f.children[0].material=new i({color:"#0007cc",shininess:1,flatShading:!0}),ee.add(f);let v=f.clone(!0);v.position.set(-40,1,-12.5),v.rotation.y+=30*e.DEG2RAD,f.children[0].material=new i({color:"#cc00c9",shininess:1,flatShading:!0}),ee.add(v);let M=f.clone(!0);M.position.set(-35,1,15),M.rotation.x-=90*e.DEG2RAD,M.rotation.y+=30*e.DEG2RAD,M.children[0].material=new i({color:"#11a10a",shininess:1,flatShading:!0}),ee.add(M)}),void 0,(function(e){console.error(e)}));let P=0,ne=new B("blackhole",!1,0);ne.addMesh(new w(6,128,128),new m({uniforms:{glowColor:{value:new T(.1,.1,.1)},p:{value:6},c:{value:.25},viewVector:{value:W.position}},vertexShader:Q,fragmentShader:U,side:h,blending:p,transparent:!0}));let oe=new n(new w(4.75,128,128),new x({color:"black",clearcoat:0,side:A}));oe.name="blackholecore",H.add(oe),H.add(ne.entity),new C(s).load("data:model/mtl;base64,IyAzZHMgTWF4IFdhdmVmcm9udCBPQkogRXhwb3J0ZXIgdjAuOTdiIC0gKGMpMjAwNyBndXJ1d2FyZQ0KIyBGaWxlIENyZWF0ZWQ6IDEyLjA5LjIwMTUgMDA6NDY6MTcNCg0KbmV3bXRsIHdpcmVfMjI5MTY2MjE1DQoJTnMgMzINCglkIDENCglUciAwDQoJVGYgMSAxIDENCglpbGx1bSAyDQoJS2EgMC44OTgwIDAuNjUxMCAwLjg0MzENCglLZCAwLjg5ODAgMC42NTEwIDAuODQzMQ0KCUtzIDAuMzUwMCAwLjM1MDAgMC4zNTAwDQoNCm5ld210bCB3aXJlXzAyODA4OTE3Nw0KCU5zIDMyDQoJZCAxDQoJVHIgMA0KCVRmIDEgMSAxDQoJaWxsdW0gMg0KCUthIDAuMTA5OCAwLjM0OTAgMC42OTQxDQoJS2QgMC4xMDk4IDAuMzQ5MCAwLjY5NDENCglLcyAwLjM1MDAgMC4zNTAwIDAuMzUwMA0K",(function(e){e.preload();let t=new E(s);t.setMaterials(e),t.load("/assets/pond.a963b409.obj",(function(e){J=e,J.scale.set(.02,.02,.02),J.rotation.set(0,-8.2,0),J.position.set(-16.5,2.8,-4),J.traverse((function(e){e instanceof n&&("Componente_24_001"===e.name?e.material=new o({color:4599322,roughness:0,metalness:0,flatShading:!1}):(e.material=new o({color:7654644,opacity:.6,metalness:0,flatShading:!1}),e.material.transparent=!0,e.material.depthTest=!1,e.renderOrder=1),e.material.side=A)}))}))})),new D(s).load("./assets/moose/scene.gltf",(function(e){q=e.scene,q.scale.set(.5,.5,.5),q.position.set(-20.8,4.5,9.1),q.rotation.set(.1,-12.9,.1)})),new D(s).load("./assets/fox/scene.gltf",(function(e){Y=e.scene,Y.scale.set(.04,.024,.03),Y.position.set(-19.8,3.5,-7.3),Y.rotation.set(0,-11.7,0)})),new C(s).load("data:model/mtl;base64,IyBXYXZlRnJvbnQgKi5tdGwgZmlsZSAoZ2VuZXJhdGVkIGJ5IENJTkVNQSA0RCkNCg0KbmV3bXRsIE1hdA0KS2EgMSAxIDENCktkIDAuODAwMDAwMDExOTIwOTMgMC44MDAwMDAwMTE5MjA5MyAwLjgwMDAwMDAxMTkyMDkzDQppbGx1bSA3DQoNCm5ld210bCBNYXQuMQ0KS2EgMSAxIDENCktkIDEgMSAxDQpLcyAxIDEgMQ0KTnMgMTAwDQppbGx1bSA3DQoNCg==",(function(e){e.preload();let t=new E(s);t.setMaterials(e),t.load("/assets/grass.130a059d.obj",(function(e){_=e,_.scale.set(.06,.06,.06)}))})),new E(s).load("/assets/twitter.f3599cc1.obj",(function(a){a.traverse((function(e){e instanceof n&&(e.material=new o({color:4177151,roughness:0,metalness:0,flatShading:!1}),e.rotation.y+=7.5)})),Z=new B("twitter",!0,45,a),K=new t;let i=new S(64,64,128,128),s=new o({color:4177151,metalness:.4});s.side=h,Me(i,4);let r=new n(i,s);K.add(r),Z.setCloseUp(K),r.rotation.x+=90*e.DEG2RAD,r.rotation.z+=90*e.DEG2RAD,function(){let t=new k,a=new k;t.moveTo(80,20),t.lineTo(40,80),t.lineTo(80,80),t.lineTo(80,20),a.moveTo(80,20),a.lineTo(40,80),a.lineTo(80,80),a.lineTo(80,20);let i=new F(t,{depth:.4,bevelEnabled:!0,bevelSegments:2,steps:2,bevelSize:1,bevelThickness:1}),s=new F(a,{depth:.4,bevelEnabled:!0,bevelSegments:2,steps:2,bevelSize:1,bevelThickness:1}),r=new n(i,new o({color:3371734,metalness:.4})),l=new n(s,new o({color:3371734,metalness:.4}));r.scale.set(1,1.75,1),l.scale.set(1,1.75,1),r.position.set(-7,-95,6),r.rotateX(0*e.DEG2RAD),r.rotateY(30*e.DEG2RAD),r.rotateZ(60*e.DEG2RAD),l.position.set(-7,-95,-6),l.rotateX(0*e.DEG2RAD),l.rotateY(330*e.DEG2RAD),l.rotateZ(60*e.DEG2RAD),K.add(l),K.add(r)}(),Z.addTree(-9,6,-4.75,7837385),Z.addTree(-12,6,-5.25,6654146),Z.addTree(-11,6,-4.5,6654146),Z.addTree(-9,6,5.05,5470907),Z.addTree(-20.2,4.8,10.05,7837385),Z.addTree(-22.3,4.8,10.05,3626634),Z.addTree(-19.9,4.5,11.25,3626634),Z.addTree(-24.4,4,13.05,3626634),H.add(Z.entity)})),te=new B("moon",!1,110),te.addMesh(new w(6,64,64),new o({map:L,normalMap:O}));let ae=new t,ie=new S(64,64,128,128),se=new o({map:L,normalMap:O});se.side=h,Me(ie,4);let re=new n(ie,se);ae.add(re),te.setCloseUp(ae),re.rotation.x+=90*e.DEG2RAD,re.rotation.z+=90*e.DEG2RAD,H.add(te.entity);const ce=new z(new l("white"),1);H.add(ce);const we=new j(new l("white"),.6);if(we.position.set(750,325,-1e3),H.add(we),R.mode){const e=new G(200,50);e.name="gridhelper",H.add(e)}for(let e=0;e<1e3;e++)this.addStar();const me=()=>{requestAnimationFrame(me),P=ne.reverberate(P),$.adjustOrbit(),te.adjustOrbit(),Z.adjustOrbit(),$.rotate(.001,.001,.01),te.rotate(.001,.001,0),Z.rotate(0,0,.002),he.isLocked&&(de?this.pinCameraToWorld(he.target):this.adjustCamera(he.target)),X.render(H,W)};me()}}).init();
