const log = document.querySelector(".log")
const edition_mode = document.querySelector(".edition-mode")
const modale = document.getElementById("modale")
const modif = document.querySelector(".modif")
const filtres = document.querySelector(".filtres")
const portfolio = document.getElementById("portfolio")


GetFiltres()

async function GetFiltres() {
    const filter = document.createElement("div")
    filter.setAttribute("class","filtres")
    portfolio.appendChild(filter)
    const buttonAll = document.createElement("button");
    buttonAll.setAttribute("class","filtre0")
    buttonAll.innerText = "Tous"
    filter.appendChild(buttonAll)
    buttonAll.classList.add('active')

    buttonAll.addEventListener("click",() =>{
        const buttons = document.querySelectorAll(".filtres button")
        buttons.forEach(btn => btn.classList.remove('active'))
        buttonAll.classList.add("active")
        const images = document.querySelectorAll('.gallery figure')
        images.forEach(img => img.style.display = 'block')
    })

    const response = await fetch("http://localhost:5678/api/categories")
    const filtres = await response.json()

    filtres.forEach(filtre =>{
        const button = document.createElement("button");
        button.setAttribute("class","filtre"+filtre.id)
        button.innerText = filtre.name
        filter.appendChild(button)

        button.addEventListener("click",() =>{
            const buttons = document.querySelectorAll(".filtres button")
            buttons.forEach(btn => btn.classList.remove('active'))
            button.classList.add("active")
            const figure =document.querySelectorAll(".gallery figure")
            console.log(figure)
            figure.forEach(img => {
                if (filtre.id === parseInt(img.getAttribute('data-category'))){
                    img.style.display = 'block'
                    console.log(parseInt(img.getAttribute('data-category')))
                }else{
                    img.style.display = 'none'
                }
            })
        })
    })
}


GetImages()

async function GetImages() {
    const gallery = document.createElement("div")
    gallery.setAttribute("class","gallery")
    portfolio.appendChild(gallery)
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
 
    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        figure.setAttribute("class","work"+work.id)
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;
    });
}


logstatus()

function logstatus() {
    if (sessionStorage.token === undefined || sessionStorage.token === null || sessionStorage.token ==="undefined"){

    }else{
        //login/logout//
        log.removeAttribute("href")
        log.innerHTML = "logout"
        log.addEventListener("click", (e) =>{
            e.preventDefault()
            sessionStorage.clear()
            log.innerHTML = "login"
            log.setAttribute("href", "login.html")
            document.querySelector(".filtres").removeAttribute("style")
            document.location.reload()
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

        //filtres//
        document.querySelector(".filtres").setAttribute("style","display: none")
        //filtres//
    }
}

//modale//
function modale_js () {
    modale.removeAttribute("style")
    modale.addEventListener("click",(e) =>{
        if(e.target === e.currentTarget) {
        close_modal()}  
    })

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
    GetWorks()

    async function GetWorks() {
        const divwork = document.createElement("div")
        divwork.setAttribute("class","divwork")
        contenu.appendChild(divwork)
        divworks = divwork
        const response = await fetch("http://localhost:5678/api/works")
        const works = await response.json()
 
        works.forEach(work => {
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const remove = document.createElement("i");
            figure.setAttribute("class","work"+work.id)
            remove.setAttribute("class","fa-solid fa-trash-can")
            divwork.appendChild(figure);
            figure.appendChild(img);
            figure.appendChild(remove);
            img.src = work.imageUrl;
            img.alt = work.title;
            remove.addEventListener("click",() =>{deleteWorks(work.id)})

            async function deleteWorks(id) {
                const deleteWork = await fetch('http://localhost:5678/api/works/'+id,
                    {
                        method:"DELETE",
                        headers: { Authorization: 'Bearer ' + sessionStorage.token }
                    }
                )
                const data = await deleteWork.status
                figure.remove()
                document.querySelector(".gallery").remove()
                GetImages()
            }
        });
    }

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
    button.addEventListener("click", () =>{
        if (document.querySelector(".divwork") != null){
            AddWorks()
        }
    })

    function AddWorks (){

        let imgadd = 0
        let imgtitre = 0
        let imgcat = 0

        previous.style.display = ""
        previous.addEventListener ("click", f_previous)
        
        function f_previous(){
            titre.innerHTML="Galerie photo"
            previous.style.display = "none"
            GetWorks()
            divadd.remove()
            button.setAttribute("value","Ajouter une photo")
            button.removeAttribute("style")
            imgadd = 0
            imgtitre = 0
            imgcat = 0
            previous.removeEventListener ("click", f_previous)
        }

        titre.innerHTML ="Ajout photo"
        document.querySelector(".divwork").remove()
        const divadd = document.createElement("div")
        divadd.setAttribute("class","divadd")
        contenu.appendChild(divadd)

        //image//
        const divaddimg = document.createElement('div')
        divaddimg.setAttribute("class","divaddimg")
        divadd.appendChild(divaddimg)
        const i = document.createElement('i')
        i.setAttribute("class","fa-regular fa-image")
        divaddimg.appendChild(i)
        const buttonaddlabel = document.createElement('label')
        buttonaddlabel.setAttribute('for',"addphoto")
        buttonaddlabel.innerHTML ="+ Ajouter photo"
        divaddimg.appendChild(buttonaddlabel)
        const buttonadd = document.createElement('input')
        buttonadd.setAttribute("type","file")
        buttonadd.setAttribute("id","addphoto")
        buttonadd.setAttribute("name","addphoto")
        buttonadd.setAttribute("style","display : none")
        buttonadd.setAttribute("accept",".jpg,.png")
        divaddimg.appendChild(buttonadd)
        const p = document.createElement('p')
        p.innerHTML="jpg, png : 4mo max"
        divaddimg.appendChild(p)
        const preview = document.createElement("img")
        preview.setAttribute("class","preview")
        preview.setAttribute("style","display : none")
        divaddimg.appendChild(preview)
        buttonadd.addEventListener("change", previewFile)

        function previewFile() {
            const file = buttonadd.files[0];
            const reader = new FileReader();
            preview.removeAttribute("style")
            i.setAttribute("style","display : none")
            buttonaddlabel.setAttribute("style","display : none")
            buttonadd.setAttribute("style","display : none")
            p.setAttribute("style","display : none")
            imgadd = file
            PostButton()

            reader.addEventListener("load", () => {
                preview.src = reader.result;
            });

            if (file) {
                reader.readAsDataURL(file);
            }
        }
        //image//

        //titre//
        const divaddtitle = document.createElement('div')
        divaddtitle.setAttribute("class","divaddtitle")
        divadd.appendChild(divaddtitle)
        const titrelabel = document.createElement('label')
        titrelabel.setAttribute("for", "titreadd")
        titrelabel.innerHTML="Titre"
        divaddtitle.appendChild(titrelabel)
        const titreinput = document.createElement('input')
        titreinput.setAttribute("type", "text")
        titreinput.setAttribute("name", "titreadd")
        titreinput.setAttribute("id", "titreadd")
        divaddtitle.appendChild(titreinput)
        titreinput.addEventListener("input", () => {
            imgtitre = titreinput.value
            PostButton()
        })
        //titre//

        //categorie//
        const divaddcat = document.createElement('div')
        divaddcat.setAttribute("class","divaddcat")
        divadd.appendChild(divaddcat)
        const catlabel = document.createElement('label')
        catlabel.setAttribute("for", "catadd")
        catlabel.innerHTML="Catégorie"
        divaddcat.appendChild(catlabel)
        const catselect = document.createElement('select')
        catselect.setAttribute("list", "cataddlist")
        catselect.setAttribute("name", "catadd")
        catselect.setAttribute("id", "catadd")
        divaddcat.appendChild(catselect)
        const optiondefault = document.createElement("option")
        optiondefault.setAttribute("value","0")
        optiondefault.innerHTML = "--Selectionner une categorie--"
        catselect.appendChild(optiondefault)
        GetData()
        catselect.addEventListener("input", () =>{
            imgcat = document.getElementById("catadd").value;
            PostButton()
        })
        async function GetData() {
            const response = await fetch("http://localhost:5678/api/categories")
            const datas = await response.json()

                datas.forEach(data => {
                    const option = document.createElement("option")
                    catselect.appendChild(option)
                    option.setAttribute("value",data.id)
                    option.innerHTML=data.name
                })
        }
        //categorie//

        //bouton//
        button.setAttribute("value","Valider")
        button.setAttribute("style","background-color: #A7A7A7;")
        button.addEventListener("click", () =>{})
        //bouton//
        
        function PostButton() {
            if (imgadd != 0 && imgtitre != 0 && imgcat != 0){
                button.removeAttribute("style")
                button.addEventListener("click",PostImg)
            }else{
                button.setAttribute("style","background-color: #A7A7A7;")
                button.removeEventListener("click",PostImg)
            }
        }
        
        async function PostImg() {
            const formData = new FormData();
            formData.append("title", imgtitre);
            formData.append("category", imgcat);
            formData.append("image", imgadd);
            const data = await fetch("http://localhost:5678/api/works",
                {
                    method: "POST",
                    headers: {"Authorization": 'Bearer ' + sessionStorage.token},
                    body: formData
                })
            const datastatus = await data.status
            console.log(datastatus)

            if(datastatus === 201){
                document.querySelector(".gallery").remove()
                GetImages()
                reset()
            }
        }

        function reset() {
            imgadd = 0
            imgcat = 0
            imgtitre = 0
            preview.setAttribute("style","display : none")
            i.removeAttribute("style","display : none")
            buttonaddlabel.removeAttribute("style","display : none")
            p.removeAttribute("style","display : none")
            titreinput.value =""
            catselect.value=optiondefault.value
            preview.removeAttribute("src")
            buttonadd.value=''
            PostButton()
        }

    }
    //bouton//
}
//modale//
