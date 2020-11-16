import Express from 'express'

import validator from '../../utils/validator.js'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import schema from '../../routes/access/schema.js'
import auth from '../../utils/auth.js'

const router = Express.Router()

const list = router.get('/file/list', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const page = +req.query.page || 1
    const listSize = +req.query.list_size || 10

    const offset = page * listSize - listSize

    const data = await FilesRepo.getByPagination({ page: offset, listSize: listSize })

    new SuccessResponse(null, data).send(res)
  } catch (err) {
    new BadRequestError('error').send(res)
  }
})

export default list
