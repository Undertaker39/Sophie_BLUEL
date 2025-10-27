const log = document.querySelector(".log")
const aside = document.querySelector("aside")
const edition_mode = document.querySelector(".edition-mode")
const modif = document.querySelector(".modif")
const filtres = document.querySelector(".filtres")

logstatus()

function logstatus() {
    if (!sessionStorage.token) {

    }else{
        //login/logout//
        log.removeAttribute("href")
        log.innerHTML = "logout"
        log.addEventListener("click", (log) =>{
            sessionStorage.clear()
            log.innerHTML = "login"
            log.setAttribute("href", "login.html")
        })
        //login/logout//

        //top modif//
        aside.setAttribute("class", "edition-mode")
        const edition_mode = document.querySelector(".edition-mode")
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
            console.log("modale")
        })
        EventTarget.
        //modif//

        //filtres//

        //filtres//
    }
}