const fs = require('fs')
const path = require('path')

const populate = async (client) => {
    await client.indices.create({
        index: 'movies',
        body: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              name: { type: 'search_as_you_type' },
              poster: { type: 'text' },
              release: { type: 'integer' },
              genres: { type: 'text' },
              overview: {type: 'text' }
            }
          }
        }
    }, { ignore: [400] })

    const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/moviesfinal.json'), 'utf8'))

    const body = data.flatMap((doc, i) => [{ index: { _index: 'movies', _id: i+1 } }, doc])
    const result = await client.bulk({ refresh: true, body })

    if(result.body.errors){
      console.log('Populate failed', result)
    }
}

module.exports = populate