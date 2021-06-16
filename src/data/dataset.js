const fs = require('fs')

fs.readFile("./movies.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log(err)
      return;
    }
    const movies = JSON.parse(jsonString)

    var newMovies = movies.map((movie,index) => {
        return {
            id: index+1,
            name: movie.title,
            poster: movie.poster,
            overview: movie.overview,
            release: new Date(parseInt(movie.release_date) * 1000).getFullYear(),
            genres: movie.genres
        }
    })
    
    fs.writeFile('./moviesfinal.json', JSON.stringify(newMovies, null, 2), (e)=>{console.log(e)})    
})