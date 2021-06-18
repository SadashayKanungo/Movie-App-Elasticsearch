const { Client } = require('@elastic/elasticsearch')
const populate = require('./populate.js')

const client = new Client({
  node: 'http://localhost:9200'
})

client.indices.exists({index: ['movies']}, (err,result)=>{
  if(result.statusCode !== 200){
    populate(client)
  }
})

module.exports = client