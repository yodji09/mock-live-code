const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/index')
app.use(cors())

app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(express.json())

app.listen(port, ()=>{
    console.log("This app listen to port", port);
})
