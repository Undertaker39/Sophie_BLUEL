let logid = 0
const log = document.querySelector(".login")
const login = document.getElementById("login")
const introduction = document.getElementById("introduction")
const portfolio = document.getElementById('portfolio')
const contact = document.getElementById("contact")
let email = document.getElementById("email")
let password = document.getElementById("password")

console.log(login)
console.log(introduction)
console.log(portfolio)
console.log(contact)
console.log(email.value)
console.log(password.value)
login_off()

log.addEventListener("click", () =>{
    console.log(logid)
    console.log ("bouton login")
    if(logid>=1){
        logid = 0
        login_off()
    }else{
        logid +=1
        login_on()
}
})

function login_on (){
    console.log("online")
    login.classList.remove("visibility")
    introduction.classList.add("visibility")
    portfolio.classList.add("visibility")
    contact.classList.add("visibility")
    let form = document.querySelector("#login form")
    form.addEventListener("submit", (event) =>{
        event.preventDefault()
        const connexion = {
            email: email.value ,
            password: password.value
        }
        const ids = JSON.stringify(connexion)
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: ids
        })
        console.log(email.value)
        console.log(password.value)

    })
}

function login_off (){
    console.log("offline")
    login.classList.add("visibility")
    introduction.classList.remove("visibility")
    portfolio.classList.remove("visibility")
    contact.classList.remove("visibility")
    email.value = null
    password.value = null
}



