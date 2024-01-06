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
    let res = await fetch(`https://crud-nocobro.onrender.com/entrevistas`);
    let json = await res.json();
    console.log(json);
    Object.keys(json).forEach(elem => {  
        console.log(json[elem]) 
        let link_with_embed = json[elem].link_entrevista.replace("watch?v=", "embed/");
        var expresionRegular = /=.*?s/;
        let new_link = link_with_embed.replace(expresionRegular, '');
        
        new_link = new_link.split('&')[0];
        
        $templateEntrevista.querySelector("iframe").src = new_link;
    
       $templateEntrevista.querySelector("iframe").src = new_link;
       $templateEntrevista.querySelector(".titulo-entrevista").textContent = json[elem].titulo;
       $templateEntrevista.querySelector(".detalles").textContent = json[elem].fecha;
       $templateEntrevista.querySelector(".descripcion-entrevistado").textContent = json[elem].descripcion;
       $templateEntrevista.querySelector(".link-yt").href = json[elem].link_entrevista;
       $templateEntrevista.querySelector(".titulo-redes").textContent = `Redes de ${json[elem].nombre_artista}`;

       let $listaRedes = $templateEntrevista.querySelector(".lista-redes"),
           listado = "";

       for (let index = 0; index < json[elem].redes.length; index++) {
           listado += `<a href="${json[elem].link_redes[index]}" target="_blank">
               <li><i class="bi bi-${json[elem].redes[index]}"></i></li>
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
        let res = await fetch(`https://crud-nocobro.onrender.com/videos`);
        let json = await res.json();
        Object.keys(json).forEach(elem => {  
            console.log(json[elem]) 
            $templateVideo.querySelector("iframe").src = json[elem].link_video;
            $templateVideo.querySelector(".link-galeria").href = json[elem].link_instagram;
            $templateVideo.querySelector(".usuario-red-social").textContent = json[elem].usuario_instagram;
    
            let $clone = d.importNode($templateVideo, true);
            $fragment.appendChild($clone);
        });
        $seccionGaleria.appendChild($fragment);
    }catch(err) {
        console.log(err);
    };
};

d.addEventListener("DOMContentLoaded", cargarVideos);

async function getDb() {
    let res = await fetch(`https://crud-nocobro.onrender.com/displayDhb`, {
        method: "POST",
        credentials: "include"
    });
    let json = await res.json();
    console.log(json);
    document.body.innerHTML = await json.html;
    addScriptTag(json.js, json.css);
}

function addScriptTag(contentJs, contentCss) {
    let script_tag = document.createElement('script');
    script_tag.type = 'text/javascript';
    script_tag.text = contentJs;
    document.body.appendChild(script_tag);
    let style_tag = document.createElement('style');
    style_tag.textContent = contentCss;
    document.body.appendChild(style_tag);
};



