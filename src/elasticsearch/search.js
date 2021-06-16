const search = async (client, searchWords) => {
    const results = await client.search({
        index: 'movies',
        body: {
            query: {
                match_phrase_prefix: {
                    name: {
                        query: searchWords
                    }
                  }
            },
            size: 8,
            from: 0,
            sort: []
        }
    })
    return(results.body.hits.hits)
}
module.exports = search