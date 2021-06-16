const { Client } = require('@elastic/elasticsearch')
const populate = require('./populate.js')

const client = new Client({
  cloud: {
    id: 'kanungo-movie-app:YXNpYS1zb3V0aDEuZ2NwLmVsYXN0aWMtY2xvdWQuY29tJDMzYmVhZWE4Y2VkZTRhNzE5NDFmNWNmM2QzNGM5OWVkJDM4YTNiZTFjMDQ2YjQyZWNiYTc3NDYxNWNhMDJmMmM1',
  },
  auth: {
    username: 'elastic',
    password: 'gnfH8oGeC8ES1BXBH0qDkYqQ'
  }
})

client.indices.exists({index: ['movies']}, (err,result)=>{
  if(result.statusCode !== 200){
    populate(client)
  }
})

module.exports = client