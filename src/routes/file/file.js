import Express from 'express'

import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import auth from '../../utils/auth.js'
import validator from '../../utils/validator.js'
import schema from '../access/schema.js'

const router = Express.Router()

const file = router.get('/file/:id', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const { id } = req.params
    const [data] = await FilesRepo.getFilebyId({ id: +id })

    new SuccessResponse(null, data).send(res)
  } catch (err) {
    console.log(err)
    new BadRequestError('error').send(res)
  }
})

export default file
