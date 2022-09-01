const addForm = document.querySelector('form')
const flavorInput = document.querySelector('input')
const container = document.querySelector('section')

const putInView = (res) => {
    container.innerHTML = ''
    flavorInput.value = ''

    res.data.forEach((flavorName, index) => {
        container.innerHTML += `<p flavor=${index}>${flavorName}</p>`
    })

    document.querySelectorAll('p').forEach(element => {
        const theIndexValue = element.getAttribute('flavor')
    

    element.addEventListener('click', () => {
        axios.delete(`/api/icecream/${theIndexValue}`)
        .then(res => {
            putInView(res)
        })

        })
    })
}

function submitHandler(evt) {
    evt.preventDefault();

    axios
        .post('/api/icecream', { flavor: flavorInput.value })
        .then(res => {
            putInView(res)
        })
        .catch(err => {
            flavorInput.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class="close">close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}

axios
.get('/api/icecream')
.then(res => {
    putInView(res)
})

addForm.addEventListener('submit', submitHandler)