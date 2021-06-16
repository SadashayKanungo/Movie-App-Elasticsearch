const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')

//Elasticsearch
const esSearch = require('./elasticsearch/search')
const esNewId = require('./elasticsearch/newid')
const {esRead, esCreate, esUpdate, esDelete} = require('./elasticsearch/crud')
const client = require('./elasticsearch/connect')
const { json } = require('express')

//Paths for Express config
const partialspath = path.join(__dirname, '../views/partials')
const viewspath = path.join(__dirname, '../views')
const publicdir = path.join(__dirname, '../public')

//Setup Handlebars engine
const app = express()
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Express Server
app.use(express.static(publicdir))

app.get('/', (req,res)=>{
    res.render('index', {
        title: 'Movies'
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help'
    })
})

app.get('/search', async (req,res)=>{
    var results = await esSearch(client, req.query.q)
    res.send({results})
})

app.get('/input', async (req,res)=>{
    res.render('input', {
        title: 'Submit'
    })
})
app.get('/edit', async (req,res)=>{
    var result = await esRead(client, req.query.id)
    res.render('edit', {
        title: 'Edit',
        data: result.body._source
    })
})

const jsonParser = bodyParser.json()
app.post('/create',jsonParser , async (req,res)=>{
    var newId = await esNewId(client)
    var result = await esCreate(client, newId, req.body)
    res.send({id: result.body._id})
})
app.get('/read', async (req,res)=>{
    var result = await esRead(client, req.query.id)
    res.render('movie', {title:'Details', data: result.body._source})
})
app.post('/update',jsonParser , async (req,res)=>{
    var result = await esUpdate(client, req.query.id, req.body)
    res.send({id: result.body._id})
})
app.get('/delete', async (req,res)=>{
    var result = await esDelete(client, req.query.id)
    res.render('deleted', {title: 'Deleted'})
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Listening on http://localhost:" + port)
})