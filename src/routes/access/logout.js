import Express from 'express'
import { nanoid } from 'nanoid'

import validator from '../../utils/validator'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import schema from './schema'
import { decodedJwt } from '../../utils/jwt'
import UserRepo from '../../database/UserRepo'

const router = Express.Router()

const logout = router.get('/logout', validator(schema.auth, 'headers'), async (req, res) => {
  try {
    const { authorization } = req.headers
    const { id } = decodedJwt(authorization.split(' ')[1])

    const newSerial = nanoid()
    await UserRepo.updateUser({ id, serial: newSerial })

    new SuccessResponse('logout success').send(res)
  } catch (err) {
    new BadRequestError('error logout').send(res)
  }
})

export default logout
