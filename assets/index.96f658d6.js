import{M as t,G as e,a as n,R as o,V as i,S as s,b as a,C as r,c as d,T as l,B as c,d as h,P as w,W as p,e as m,f as u,A as y,g,O as b,h as f,i as v,L as x}from"./vendor.3ae14f8e.js";class I{constructor(o,i,s,a=null){this.isGroup=!1,this.distance=0,this.tilt=t.randInt(-70,10),this.theta=t.randFloat(0,6.28318530718),this.cameraIsAt=!1,this.entity=null,this.entityCloseUp=null,null!=a?this.entity=a:this.isGroup?this.entity=new e:this.entity=new n,this.entity.name=o,this.isGroup=i,this.distance=s}swapEntities(t){!1===this.cameraIsAt?(t.remove(this.entity),t.add(this.entityCloseUp),this.cameraIsAt=!0):(t.remove(this.entityCloseUp),t.add(this.entity),this.cameraIsAt=!1)}addMesh(t,e){this.isGroup?this.entity.add(new n(t,e)):(this.entity.geometry=t,this.entity.material=e)}setCloseUp(t){this.entityCloseUp=t}rotate(t,e,n){this.entity.rotation.x+=t,this.entity.rotation.y+=e,this.entity.rotation.z+=n}adjustOrbit(){let t;t=this.cameraIsAt?this.entityCloseUp:this.entity;t.position.x=this.distance*Math.cos(this.theta),t.position.y=this.distance*Math.sin(this.theta),t.position.z=this.tilt*Math.sin(this.theta),this.theta+=1/(.07*this.distance**2)}setName(t){this.entity.name=t}getName(){return this.entity.name}}var M,j,k="/3D-Interactive-Portfolio/assets/twitter.f3599cc1.obj";(j=M||(M={}))[j.spawn=0]="spawn",j[j.blackHole=1]="blackHole",j[j.twitter=2]="twitter",j[j.autosage=3]="autosage",j[j.torus=4]="torus",j[j.moon=5]="moon";let z,D,E,L,P,C,A=0;var F=new Audio("/3D-Interactive-Portfolio/assets/zoomout.73f18dd5.wav");F.volume=.9;var S=new Audio("/3D-Interactive-Portfolio/assets/background.dd42b1f0.mp3");S.volume=.65;var U=!1,G=!1,O=!1,W=!1,H=!1,R=new o,T=new i;const V={x:0,y:0,z:290};let q={isLocked:!1,target:null,name:0};function B(t){if(T.x=t.clientX/window.innerWidth*2-1,T.y=-t.clientY/window.innerHeight*2+1,R.setFromCamera(T,E),R.intersectObjects(D.children),R.ray.intersectsBox((new v).setFromObject(P.entity)))q={isLocked:!0,target:P.entity,name:2};else for(var e=R.intersectObjects(D.children),n=0;n<e.length;n++)if("star"!=e[n].object.name&&"skybox"!=e[n].object.name)return q.isLocked=!0,q.target=e[n].object,void("moon"==e[n].object.name?q.name=5:"black hole"==e[n].object.name?q.name=1:"torus"==e[n].object.name&&(q.name=4))}function X(t){if(0!=q.name){var e=t.which;32!=e&&27!=e||(Z(!1),N(q.name,!0),q={isLocked:!0,target:{position:V},name:0},F.play())}}function Y(){A+=1}function N(t,e){switch(e?(H=!1,E.rotation.y=0):(H=!0,E.rotation.y=1.57),t){case 1:case 5:break;case 2:e?P.swapEntities(D):(P.swapEntities(D),q.target=P.entityCloseUp);break;case 3:break;default:console.log("DEFAULT TRIGGERED!?!?!?!?")}}function Z(t=!0,e="730ms"){var n=document.getElementById("bg");return n.style.transitionDuration=e,n.style.opacity=t?"0":"1",!1}function J(t){t.target.remove()}function K(){E.aspect=window.innerWidth/window.innerHeight,E.updateProjectionMatrix(),L.setSize(window.innerWidth,window.innerHeight)}(new class{addStar(e=!1){const o=new s(t.randFloat(.25,.75),24,24),i=new a({color:new r("white")}),d=new n(o,i);let l,c,h,w,p,m;w=0==t.randInt(0,1)?-1:1,p=0==t.randInt(0,1)?-1:1,m=e||0==t.randInt(0,1)?-1:1;const u=700;l=t.randFloat(0,w*u),h=t.randFloat(0,m*u),c=Math.abs(h)>260||Math.abs(l)>260?t.randFloat(0,p*u):t.randFloat(260*p,p*u),d.position.set(l,c,h),d.name="star",z.add(d)}pinCameraToWorld(e){console.log(E.rotation.x+30*t.DEG2RAD),E.position.set(e.position.x,e.position.y+10,e.position.z)}adjustCamera(t,e=.08,n=.025){const o=E.position.x-t.position.x,i=E.position.y-t.position.y,s=E.position.z-t.position.z,a=.05,r=.05;let d=Math.abs(o);d>18?E.position.x-=o*e:d>5?(E.position.x-=o*a,U=!0):d>1?(E.position.x-=o*n,U=!0):d>.1?(E.position.x-=Math.sign(o)*r,U=!0):d>=0&&(E.position.x=t.position.x,U=!0);let l=Math.abs(i);l>18?E.position.y-=i*e:l>5?(E.position.y-=i*a,G=!0):l>1?(E.position.y-=i*n,G=!0):l>.1?(E.position.y-=Math.sign(i)*r,G=!0):l>=0&&(E.position.y=t.position.y,G=!0);let c=Math.abs(s);c>18?E.position.z-=s*e:c>5?(E.position.z-=s*a,O=!0):c>1?(E.position.z-=s*n,O=!0):c>.1?(E.position.z-=Math.sign(s)*r,O=!0):c>=0&&(E.position.z=t.position.z,O=!0),E.position.x==V.x&&E.position.y==V.y&&E.position.z==V.z?(q={isLocked:!1,target:null,name:0},console.log("Matched at spawn: "+E.position.x+"  "+V.x),U=!1,G=!1,O=!1,W=!1):U&&G&&O&&(0==W&&(Z(),setTimeout((function(){N(q.name,!1),Z(!1)}),1e3)),W=!0)}init(){let e;z=new d,document.body.addEventListener("mousemove",(function(){S.play()}));const o=new x((()=>{if(console.log("Loaded: "+A),A>=0){console.log("Loaded skybox"),e=new n(M,j),e.name="skybox",z.add(e);const t=document.querySelector("#loading-screen");null==t||t.classList.add("fade-out"),null==t||t.addEventListener("transitionend",J)}})),v=new l(o);let M=new c(2100,2100,2100),j=[new a({map:v.load("/3D-Interactive-Portfolio/assets/right.19f9b8b4.png",Y)}),new a({map:v.load("/3D-Interactive-Portfolio/assets/left.06e25816.png",Y)}),new a({map:v.load("/3D-Interactive-Portfolio/assets/top.14e60ce3.png",Y)}),new a({map:v.load("/3D-Interactive-Portfolio/assets/bottom.8560bb79.png",Y)}),new a({map:v.load("/3D-Interactive-Portfolio/assets/front.e060fa56.png",Y)}),new a({map:v.load("/3D-Interactive-Portfolio/assets/back.1d924bd0.png",Y)})];j.forEach((t=>t.side=h));let F=new l(o).load("/3D-Interactive-Portfolio/assets/moon.b246064f.jpg",Y),U=new l(o).load("/3D-Interactive-Portfolio/assets/moonbumpmap.8e277ece.jpg",Y);E=new w(60,window.innerWidth/window.innerHeight,.1,5e3),E.position.z=V.z,E.position.y=V.y,window.addEventListener("mousedown",B,!1),window.addEventListener("keydown",X,!1),window.addEventListener("resize",K,!1),L=new p({canvas:document.querySelector("#bg")}),L.setPixelRatio(window.devicePixelRatio),L.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(L.domElement);const G=new I("torus",!1,140);G.addMesh(new m(10,3,16,100),new u({color:16737095,flatShading:!1,roughness:0,wireframe:!1})),z.add(G.entity);const O=new y(new r("white"),1);z.add(O),new g(200,50);for(let t=0;t<600;t++)this.addStar();let W=new I("black hole",!1,0);W.addMesh(new s(6,128,128),new u({color:"black",roughness:0,metalness:1,flatShading:!1})),z.add(W.entity),console.log(k),new b(o).load(k,(function(t){t.traverse((function(t){t instanceof n&&(t.material=new u({color:4177151,roughness:0,metalness:0,flatShading:!1}),t.rotation.y+=7.5)})),P=new I("twitter",!0,90,t),P.setCloseUp(C),z.add(P.entity),Y()}));let R=new f(64,96,32,32),T=new u({color:4177151,map:F,metalness:0,normalMap:U});T.side=h,function(t,e){let n=.5*t.parameters.width,o=new i(-n,0),s=new i(0,e),a=new i(n,0),r=(new i).subVectors(o,s),d=(new i).subVectors(s,a),l=(new i).subVectors(o,a),c=r.length()*d.length()*l.length()/(2*Math.abs(r.cross(l))),h=new i(0,e-c),w=2*((new i).subVectors(o,h).angle()-.5*Math.PI),p=t.attributes.uv,m=t.attributes.position,u=new i;for(let i=0;i<p.count;i++){let t=1-p.getX(i),e=m.getY(i);u.copy(a).rotateAround(h,w*t),m.setXYZ(i,u.x,e,-u.y)}m.needsUpdate=!0}(R,5),C=new n(R,T),C.rotation.x+=90*t.DEG2RAD;let N=new I("moon",!1,170);N.addMesh(new s(6,64,64),new u({color:"white",map:F,normalMap:F})),z.add(N.entity),D=z;const Z=()=>{requestAnimationFrame(Z),G.adjustOrbit(),N.adjustOrbit(),P.adjustOrbit(),G.rotate(.01,.005,.001),N.rotate(.001,.001,0),P.rotate(0,0,.002),q.isLocked&&(H?this.pinCameraToWorld(q.target):this.adjustCamera(q.target)),L.render(D,E)};Z()}}).init();
