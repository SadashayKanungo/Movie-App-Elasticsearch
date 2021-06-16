const esRead = async (client, id) => {
    const result = await client.get({
        index: 'movies',
        id: id
    })
    return(result)
}
const esCreate = async (client, newId, data) => {
    const result = await client.create({
        index: 'movies',
        id: newId,
        body: {id: newId, ...data}
    })
    return(result)
}
const esUpdate = async (client, id, data) => {
    const result = await client.update({
        index: 'movies',
        id,
        body: {
          doc: {id, ...data}
        }
      })
    return(result)
}
const esDelete = async (client, id) => {
    const results = await client.delete({
        index: 'movies',
        id: id
    })
    return(results)
}
module.exports = {
    esRead,
    esCreate,
    esUpdate,
    esDelete
}