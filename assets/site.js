document.getElementById("year")?.replaceChildren(String(new Date().getFullYear()));
const menu=document.querySelector(".menu");
const nav=document.getElementById("primary-nav");
menu?.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav?.classList.toggle("open",!open)});
