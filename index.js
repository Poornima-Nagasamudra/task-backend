const express = require('express')
const app = express()
const port = 4001
const cors = require('cors')

const taskDB = require('./config/database')
const routes = require('./config/routes')

app.use(express.json())
app.use(cors())
taskDB()
app.use('/', routes)

app.listen(port, function(){
    console.log('server runs on port', port)
})