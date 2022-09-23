if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

// setting view engine
app.set('view engine', 'ejs')
// setting where views coming from
app.set('views', __dirname + '/views')
// linking express layout
app.set('layout', 'layouts/layout')
// telling express application to use express layout
app.use(expressLayout)
//setting public files
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
  useNEWUrlParser: true,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)

// setting port for listen
app.listen(process.env.PORT || 3000)
