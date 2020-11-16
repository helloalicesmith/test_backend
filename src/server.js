import Express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
import bodyParser from 'body-parser'

import routes from './routes/index.js'

dotenv.config()
const app = new Express()

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'users',
  password: process.env.PASSWD_SQL,
})

connection.connect(err => {
  if (err) {
    console.error(`MySQL error -> ${err.message}`)
    return
  } else {
    console.log('Connection to MySQL server was successful')

    // app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded())

    routes.forEach(route => {
      app.use('/api', route)
    })

    app.listen(process.env.PORT, () => {
      console.log(`Listening at http://localhost:${process.env.PORT}`)
    })
  }
})
