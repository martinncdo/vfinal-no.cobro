let animado = document.querySelectorAll(".animado");

function mostrarScroll() {
    let scrollTop = document.documentElement.scrollTop;
    for (var i = 0; 1 < animado.length; i++) {
        let alturaAnimado = animado[i].offsetTop;
        if (alturaAnimado - 510 < scrollTop) {
            animado[i].style.opacity = 1;
            animado[i].classList.add("mostrarArriba");
        }
    }
}

window.addEventListener('scroll', mostrarScroll);

window.addEventListener('load', function () {
    const elementosLeft = document.querySelectorAll('.fadeInLeft');
    const elementosRight = document.querySelectorAll('.fadeInRight')

    elementosRight.forEach(function (elementoRight, index) {
        setTimeout(function () {
            elementoRight.classList.add('active');
        }, index * 100); 
    });

    elementosLeft.forEach(function (elementoLeft, index) {
        setTimeout(function () {
            elementoLeft.classList.add('active');
        }, index * 100); 
    });
});

window.addEventListener('load', () => {
    let texto = document.getElementById("fuente");
    setTimeout(() => {
        texto.classList.add("titulo-efecto");
    }, 500);
});

//función navbar responsive

function hamburgerMenu(panelBtn, panel, menuLink) {
    const d = document;

    d.addEventListener("click", e => {
        if (e.target.matches(panelBtn) || e.target.matches(`${panelBtn} *`)) {
            d.querySelector(panel).classList.toggle("is-active");
            d.querySelector(panelBtn).classList.toggle("is-active");
        }

        if (e.target.matches(menuLink)) {
            d.querySelector(panel).classList.remove("is-active");
            d.querySelector(panelBtn).classList.remove("is-active");
        }

    });
}

hamburgerMenu(".panel-btn", ".panel", ".menu a");

// Envío de email

const d = document,
    $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

d.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target == $form) {
        try {
            $loader.classList.remove("none");
            let data = await {
                method: "POST",
                body: new FormData(e.target)
            },
                res = await fetch("https://formsubmit.co/ajax/ca3d64ec31dd5a263771855b0870f3f8", data);
            console.log(res.json())
            $loader.classList.add("none");
            $response.classList.remove("none");
            setTimeout(e => {
                $response.classList.add("none");
            }, 3000);
            $form.reset();

            if (!res.ok) return { status: res.status, msg: res.statusText };
        } catch (err) {
            $form.insertAdjacentElement("afterend", `<p style= "text-align: center;">${err.status}: ${err.msg}</p>`);
        }
    }

    if (e.target.matches(".form-signin")) {
        console.log("yesss")
        try {
            let res = await fetch(`https://crud-nocobro.onrender.com/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    user: e.target.user.value,
                    password: e.target.password.value
                })
            });
            let json = await res.json();
            console.log(json.status);
            if (json.status == 200) {
                setTimeout(() => {
                    getDb();
                }, 1500);
            }
        } catch (error) {

        };
    }

}
);

// Entrevistas

const $fragment = d.createDocumentFragment(),
    $seccionEntrevistas = d.querySelector(".entrevistas"),
    $templateEntrevista = d.querySelector(".template-entrevista").content;

async function cargarEntrevistas() {
    let res = await fetch("material.json");
    let json = await res.json();
    Object.keys(json.entrevistas).forEach(elem => {  
         let link_with_embed = json.entrevistas[elem].linkentrevista.replace("watch?v=", "embed/");
         var expresionRegular = /=.*?s/;
         let new_link = link_with_embed.replace(expresionRegular, '');
        
         new_link = new_link.split('&')[0];
        
         $templateEntrevista.querySelector("iframe").src = new_link;
    
        $templateEntrevista.querySelector("iframe").src = new_link;
        $templateEntrevista.querySelector(".titulo-entrevista").textContent = json.entrevistas[elem].titulo;
        $templateEntrevista.querySelector(".detalles").textContent = json.entrevistas[elem].fecha;
        $templateEntrevista.querySelector(".descripcion-entrevistado").textContent = json.entrevistas[elem].descripcion;
        $templateEntrevista.querySelector(".link-yt").href = json.entrevistas[elem].linkentrevista.split('&')[0];
        $templateEntrevista.querySelector(".titulo-redes").textContent = `Redes de ${json.entrevistas[elem].nombre}`;

        let $listaRedes = $templateEntrevista.querySelector(".lista-redes"),
            listado = "";

        for (let index = 0; index < json.entrevistas[elem].redes.length; index++) {
            listado += `<a href="${json.entrevistas[elem].linkredes[index]}" target="_blank">
                <li><i class="bi bi-${json.entrevistas[elem].redes[index]}"></i></li>
                </a>`;
        };

        $listaRedes.innerHTML = listado;
       let $clone = d.importNode($templateEntrevista, true);
       $fragment.appendChild($clone);
   });
   $seccionEntrevistas.appendChild($fragment);
};

d.addEventListener("DOMContentLoaded", cargarEntrevistas);

// Galería

const $seccionGaleria = d.querySelector("#material"),
    $templateVideo = d.querySelector(".template-galeria").content;

 async function cargarVideos() {
     try {
         let res = await fetch("material.json");
         let json = await res.json();
         Object.keys(json.videos).forEach(elem => {  
             console.log(json.videos[elem]) 
             $templateVideo.querySelector("iframe").src = json.videos[elem].srciframe;
             $templateVideo.querySelector(".link-galeria").href = json.videos[elem].linkredsocial;
             $templateVideo.querySelector(".usuario-red-social").textContent = json.videos[elem].usuarioredsocial;
    
             let $clone = d.importNode($templateVideo, true);
             $fragment.appendChild($clone);
         });
         $seccionGaleria.appendChild($fragment);
     }catch(err) {
         console.log(err);
     };
 };

 d.addEventListener("DOMContentLoaded", cargarVideos);