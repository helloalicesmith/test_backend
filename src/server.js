import Express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import './database'
import routes from './routes/index'

dotenv.config()
const app = new Express()

app.use(cors())
app.use(Express.static('uploads'))
app.use(bodyParser.json())

routes.forEach(route => {
  app.use('/api', route)
})

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})
