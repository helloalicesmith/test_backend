import Express from 'express'

import validator from '../../utils/validator.js'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import UserRepo from '../../database/UserRepo.js'
import schema from '../../routes/access/schema.js'
import auth from '../../utils/auth.js'
import { decodedJwt } from '../../utils/jwt.js'

const router = Express.Router()

const info = router.get('/info', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const { authorization } = req.headers
    const { id } = decodedJwt(authorization.split(' ')[1])

    const { id: userId } = await UserRepo.getUserById({ id })

    new SuccessResponse(null, userId).send(res)
  } catch (err) {
    new BadRequestError('error').send(res)
  }
})

export default info
