let animado=document.querySelectorAll(".animado");function mostrarScroll(){let e=document.documentElement.scrollTop;for(var t=0;1<animado.length;t++)animado[t].offsetTop-510<e&&(animado[t].style.opacity=1,animado[t].classList.add("mostrarArriba"))}function hamburgerMenu(e,t,a){let s=document;s.addEventListener("click",o=>{(o.target.matches(e)||o.target.matches(`${e} *`))&&(s.querySelector(t).classList.toggle("is-active"),s.querySelector(e).classList.toggle("is-active")),o.target.matches(a)&&(s.querySelector(t).classList.remove("is-active"),s.querySelector(e).classList.remove("is-active"))})}window.addEventListener("scroll",mostrarScroll),window.addEventListener("load",function(){let e=document.querySelectorAll(".fadeInLeft"),t=document.querySelectorAll(".fadeInRight");t.forEach(function(e,t){setTimeout(function(){e.classList.add("active")},100*t)}),e.forEach(function(e,t){setTimeout(function(){e.classList.add("active")},100*t)})}),window.addEventListener("load",()=>{texto=document.getElementById("fuente"),setTimeout(()=>{texto.classList.add("titulo-efecto")},500)}),hamburgerMenu(".panel-btn",".panel",".menu a");const d=document,$form=d.querySelector(".contact-form"),$loader=d.querySelector(".contact-form-loader"),$response=d.querySelector(".contact-form-response");d.addEventListener("submit",async e=>{if(e.preventDefault(),e.target==$form)try{$loader.classList.remove("none");let t=await fetch("https://formsubmit.co/ajax/ca3d64ec31dd5a263771855b0870f3f8",await {method:"POST",body:new FormData(e.target)});if(console.log(t.json()),$loader.classList.add("none"),$response.classList.remove("none"),setTimeout(e=>{$response.classList.add("none")},3e3),$form.reset(),!t.ok)return{status:t.status,msg:t.statusText}}catch(a){$form.insertAdjacentElement("afterend",`<p style= "text-align: center;">${a.status}: ${a.msg}</p>`)}});