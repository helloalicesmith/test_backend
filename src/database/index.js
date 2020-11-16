import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'users',
  password: process.env.PASSWD_SQL,
})

connection.connect(err => {
  if (err) {
    console.error(`MySQL error -> ${err.message}`)
  } else {
    console.log('Connection to MySQL server was successful')
  }
})

export default connection
