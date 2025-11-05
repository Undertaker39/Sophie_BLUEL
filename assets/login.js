const form = document.querySelector("form")
let email = document.getElementById("email")
let password = document.getElementById("password")
const error = document.querySelector(".error")


form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const connexion = {
        email: email.value,
        password: password.value
    }
    const ids = JSON.stringify(connexion)
    const data = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: ids
    })
    
    const token = await data.json()
    sessionStorage.setItem("token", token.token)
    if (token.token === undefined || token.token === null || !sessionStorage.token) {
        error.innerHTML ="Votre adresse e-mail ou votre mot de passe sont erronés"
    } else {
        window.location.href = "index.html"
    }
})