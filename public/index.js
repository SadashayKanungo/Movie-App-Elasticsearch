const search = document.querySelector('#search')
const display = document.querySelector('#results')

// !!!!!!!! NOT WORKING !!!!!!!!
//const resultsTemplate = document.querySelector('#resultsTemplate').innerHTML
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const resultsTemplate = '{{#each results}}<div class="movie"><h3>{{this._source.name}}</h3><a href="/read?id={{this._source.id}}">&#9998;</a></div>{{/each}}'

search.addEventListener('input', (e)=>{
    fetch(`/search?q=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
        var compiledTemplate = Handlebars.compile(resultsTemplate)
        var html = compiledTemplate({results: data.results})
        display.innerHTML = html
    })
})