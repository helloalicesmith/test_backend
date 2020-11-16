import Express from 'express'

import validator from '../../utils/validator.js'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import schema from './schema.js'
import { decodedJwt } from '../../utils/jwt.js'
import UserRepo from '../../database/UserRepo.js'

const router = Express.Router()

const logout = router.get('/logout', validator(schema.auth, 'headers'), async (req, res) => {
  try {
    const { authorization } = req.headers
    const { id } = decodedJwt(authorization.split(' ')[1])

    const user = await UserRepo.getUserById({ id })

    const newSerial = (user.serial += 1)
    await UserRepo.updateUser({ id, serial: newSerial })

    new SuccessResponse('logout success').send(res)
  } catch (err) {
    console.log(err)
    new BadRequestError('error logout').send(res)
  }
})

export default logout
