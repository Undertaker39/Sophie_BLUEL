let log = document.querySelector(".log")
let submit = document.querySelector("input[type=submit]")


function logstatus() {
    console.log(sessionStorage.length)
    if (sessionStorage.length = "0") {
        log.innerHTML = "Login"
        submit.value = "Se Connecter"
    }else{
        log.innerHTML = "Logout"
        log.addEventListener("click", () =>{
            sessionStorage.clear()
            logstatus()
        })
        log.removeAttribute("href")
        submit.value = "Déconnecter"
        submit.addEventListener("click", () =>{
            sessionStorage.clear()
            logstatus()
        })
    }
}

logstatus()
