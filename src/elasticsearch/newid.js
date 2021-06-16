const newId = async (client) => {
    const results = await client.search({
        index: 'movies',
        body: {
            size: 1,
            sort: { id: "desc"},
            query: {
                match_all: {}
            }
        }
    })
    return(results.body.hits.hits[0]._source.id + 1)
}
module.exports = newId