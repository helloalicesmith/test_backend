import Express from 'express'

import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import auth from '../../utils/auth.js'
import validator from '../../utils/validator.js'
import schema from '../access/schema.js'

const router = Express.Router()

const deleteFile = router.delete('/file/delete/:id', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const { id } = req.params
    await FilesRepo.deleteFile({ id: +id })

    new SuccessResponse('file deleted').send(res)
  } catch (err) {
    new BadRequestError('error').send(res)
  }
})

export default deleteFile
