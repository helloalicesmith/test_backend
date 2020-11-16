import Express from 'express'

import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import FilesRepo from '../../database/FilesRepo'
import auth from '../../utils/auth'
import validator from '../../utils/validator'
import schema from '../access/schema'

const router = Express.Router()

const file = router.get('/file/:id', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const { id } = req.params
    const [data] = await FilesRepo.getFilebyId({ id: +id })

    new SuccessResponse(null, data).send(res)
  } catch (err) {
    new BadRequestError('error').send(res)
  }
})

export default file
