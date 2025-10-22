let log = document.querySelector(".log")
let submit = document.querySelector("input[type=submit]")
let tokens = 0

logstatus()

function logstatus() {
    if (tokens != 0) {
        log.innerHTML = "Logout"
        submit.value = "Déconnecter"
    }
}


function logout (){
    sessionStorage.removeItem("token")
    tokens = 0
    logstatus()
}