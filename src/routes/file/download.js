import Express from 'express'

import { BadRequestError } from '../../core/ApiResponse'
import FilesRepo from '../../database/FilesRepo'
import auth from '../../utils/auth'
import validator from '../../utils/validator'
import schema from '../access/schema'

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
