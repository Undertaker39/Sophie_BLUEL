async function getFilters() {
    const filtres = await fetch('http://localhost:5678/api/categories')
    const data = await filtres.json()

    console.log(data)

    const divFiltres = document.querySelector('.filtres')

    const buttonAll = document.createElement('button')
    buttonAll.textContent = 'Tous'
    buttonAll.classList.add('active')
    divFiltres.appendChild(buttonAll)

    buttonAll.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.filtres button')
        buttons.forEach(btn => btn.classList.remove('active'))
        buttonAll.classList.add('active')
        const images = document.querySelectorAll('.gallery figure')
        images.forEach(img => img.style.display = 'block')
    })

    data.forEach(category => {
        const button = document.createElement('button')
        button.textContent = category.name
        divFiltres.appendChild(button)

        button.addEventListener('click', () => {
            const buttons = document.querySelectorAll('.filtres button')
            buttons.forEach(btn => btn.classList.remove('active'))
            button.classList.add('active')
            const images = document.querySelectorAll('.gallery figure')
            images.forEach(img => {
                if (category.id === parseInt(img.getAttribute('data-category'))) {
                    img.style.display = 'block'
                } else {
                    img.style.display = 'none'
                }
            })
        })
    })
}

getFilters()