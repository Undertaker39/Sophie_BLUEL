const gallery = document.querySelector(".gallery")

async function GetWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()
 
    works.forEach(work => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        gallery.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.innerText = work.title;
    });
}

GetWorks()