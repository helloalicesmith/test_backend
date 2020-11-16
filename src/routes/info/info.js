import Express from 'express'

import validator from '../../utils/validator'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import UserRepo from '../../database/UserRepo'
import schema from '../access/schema'
import auth from '../../utils/auth'
import { decodedJwt } from '../../utils/jwt'

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
