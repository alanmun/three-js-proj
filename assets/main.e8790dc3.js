import"./modulepreload-polyfill.b7f2da20.js";let i=["Created by Alan Munirji"],n=0,s=1e3;function r(){const e=document.querySelector("#intro-screen");var t=document.createElement("P");t.id="intro-screen-title";for(let o=0;o<n;o++)t.innerHTML+="<br/>";t.innerHTML=i[n++],e.appendChild(t),n<i.length?setTimeout(r,1e3):setTimeout(a,s)}function a(){document.querySelector("#intro-screen-title").classList.add("fade-out"),setTimeout(()=>{const t=document.querySelector("#intro-screen");t==null||t.classList.add("fade-out"),t==null||t.addEventListener("transitionend",d),document.body.style.overflowY="auto"},1e3)}function d(e){e.target.remove()}setTimeout(r,500);
