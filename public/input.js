const inputForm = document.querySelector('form')

function onSubmit(){
    const data = {
        name: inputForm.name.value,
        release: parseInt(inputForm.release.value),
        poster: inputForm.poster.value,
        genres: inputForm.genres.value.split(','),
        overview: inputForm.overview.value
    }
    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {window.location.href = '/read?id='+data.id})
}

function onEdit(id){
    const data = {
        name: inputForm.name.value,
        release: parseInt(inputForm.release.value),
        poster: inputForm.poster.value,
        genres: inputForm.genres.value.split(','),
        overview: inputForm.overview.value
    }
    fetch(`/update?id=${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {window.location.href = '/read?id='+data.id})
}