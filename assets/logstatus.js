const log = document.querySelector(".log")
const edition_mode = document.querySelector(".edition-mode")
const modale = document.getElementById("modale")
const modif = document.querySelector(".modif")
const filtres = document.querySelector(".filtres")

logstatus()

function logstatus() {
    if (!sessionStorage.token) {

    }else{
        //login/logout//
        log.removeAttribute("href")
        log.innerHTML = "logout"
        log.addEventListener("click", () =>{
            sessionStorage.clear()
            log.innerHTML = "login"
            log.setAttribute("href", "login.html")
        })
        //login/logout//

        //top modif//
        edition_mode.removeAttribute("style")
        const iem = document.createElement("i");
        const pem = document.createElement("p");
        edition_mode.appendChild(iem);
        edition_mode.appendChild(pem);
        iem.setAttribute("class", "fa-regular fa-pen-to-square")
        pem.innerText = "Modif"
        //top modif//

        //modif//
        const im = document.createElement("i");
        const pm = document.createElement("p");
        modif.appendChild(im);
        modif.appendChild(pm);
        im.setAttribute("class", "fa-regular fa-pen-to-square")
        pm.innerText = "modifier"
        modif.addEventListener("click", () =>{
            if (modale.style.display === "none") {
                modale_js()
            } else {

            }
        })
        //modif//

        //modale//
        
        //modale//

        //filtres//

        //filtres//
    }
}

//modale//
function modale_js () {
    modale.removeAttribute("style")

    //close modale//
    function close_modal () {
        modale.setAttribute("style","display: none")
        modal.remove()
    }
    //close modale//

    //modale warpper//
    const modal = document.createElement("div")
    modal.setAttribute("class","modal-wrapper")
    modale.appendChild(modal)
    //modale wrapper//

    //nav//
    const nav = document.createElement("nav")
    nav.setAttribute("class","modal-nav")
    modal.appendChild(nav)
    const close = document.createElement("i")
    close.setAttribute("class","fa-solid fa-xmark")
    nav.appendChild(close)
    close.addEventListener("click", () =>{
        console.log("close modal")
        close_modal()
    })
    const previous = document.createElement("i")
    previous.setAttribute("class", "fa-solid fa-arrow-left")
    nav.appendChild(previous)
    previous.setAttribute("style", "display: none")
    //nav//

    //titre//
    const titre = document.createElement("h3")
    titre.setAttribute("class","modal-title")
    titre.innerHTML="Galerie photo"
    modal.appendChild(titre)
    //titre//

    //contenu//
    const contenu = document.createElement("section")
    contenu.setAttribute("class","modal-content")
    modal.appendChild(contenu)
    //contenu//

    //hr//
    const hr = document.createElement("hr")
    hr.setAttribute("class","modal-hr")
    modal.appendChild(hr)
    //hr//

    //bouton//
    const button = document.createElement("input")
    button.setAttribute("type","submit")
    button.setAttribute("value","Ajouter une photo")
    modal.appendChild(button)

    //bouton//
}

//modale// 
