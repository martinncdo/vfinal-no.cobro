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

// En tu archivo JavaScript
window.addEventListener('load', function () {
    // Cuando se cargue la página, obtén todos los elementos con la clase 'fadeIn'
    const elementosLeft = document.querySelectorAll('.fadeInLeft');
    const elementosRight = document.querySelectorAll('.fadeInRight')

    elementosRight.forEach(function (elementoRight, index) {
        setTimeout(function () {
            elementoRight.classList.add('active');
        }, index * 100); // Agrega un pequeño retraso entre cada animación para que parezca más natural
    });
    // Agrega la clase 'active' a cada elemento después de un breve momento para iniciar la animación
    elementosLeft.forEach(function (elementoLeft, index) {
        setTimeout(function () {
            elementoLeft.classList.add('active');
        }, index * 100); // Agrega un pequeño retraso entre cada animación para que parezca más natural
    });
});

window.addEventListener('load', () => {
    texto = document.getElementById("fuente");
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
}
);

// Entrevistas

const $fragment = d.createDocumentFragment(),
    $seccionEntrevistas = d.querySelector(".entrevistas"),
    $templateEntrevista = d.querySelector(".template-entrevista").content;

async function cargarEntrevistas() {
    try {
        let res = await fetch("material.json"),
            json = await res.json(),
            entrevistas = await json["entrevistas"];
        entrevistas.forEach(entr => {
            $templateEntrevista.querySelector(".img-entrevista").src = entr.srcimagen;
            $templateEntrevista.querySelector(".img-entrevista").alt = entr.altimagen;
            $templateEntrevista.querySelector(".titulo-entrevista").textContent = entr.titulo;
            $templateEntrevista.querySelector(".detalles").textContent = entr.fecha;
            $templateEntrevista.querySelector(".descripcion-entrevistado").textContent = entr.descripcion;
            $templateEntrevista.querySelector(".link-yt").href = entr.linkentrevista;
            $templateEntrevista.querySelector(".titulo-redes").textContent = `Redes de ${entr.nombre}`;

            let $listaRedes = $templateEntrevista.querySelector(".lista-redes"),
                listado = "";

            for (let index = 0; index < entr.redes.length; index++) {
                console.log(entr.redes[index]);
                listado += `<a href="${entr.linkredes[index]}" target="_blank">
                    <li><i class="bi bi-${entr.redes[index]}"></i></li>
                    </a>`;
            };

            $listaRedes.innerHTML = listado;
            let $clone = d.importNode($templateEntrevista, true);
            $fragment.appendChild($clone);
        });
        $seccionEntrevistas.appendChild($fragment);
    } catch(err) {
        console.log(err);
    }
}

d.addEventListener("DOMContentLoaded", cargarEntrevistas);

// Galería

const $seccionGaleria = d.querySelector("#material"),
    $templateVideo = d.querySelector(".template-galeria").content;

async function cargarVideos() {
    try {
        let res = await fetch("material.json"),
            json = await res.json(),
            videos = await json["videos"];
        console.log(videos);
        videos.forEach(video => {
            $templateVideo.querySelector("iframe").src = video.srciframe;
            $templateVideo.querySelector(".link-galeria").href = video.linkredsocial;
            $templateVideo.querySelector(".usuario-red-social").textContent = video.usuarioredsocial;
    
            let $clone = d.importNode($templateVideo, true);
            $fragment.appendChild($clone);
        });
        $seccionGaleria.appendChild($fragment);
    }catch(err) {
        console.log(err);
    }
};

d.addEventListener("DOMContentLoaded", cargarVideos);
