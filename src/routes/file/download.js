import Express from 'express'

import { BadRequestError } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import auth from '../../utils/auth.js'
import validator from '../../utils/validator.js'
import schema from '../access/schema.js'

const router = Express.Router()

const download = router.get('/file/download/:id', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const { id } = req.params
    const [data] = await FilesRepo.getFilebyId({ id: +id })
    const file = `uploads/${data.name}.${data.extension}`

    res.download(file)
  } catch (err) {
    new BadRequestError('file not found').send(res)
  }
})

export default download
