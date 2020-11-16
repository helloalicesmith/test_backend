/* eslint-disable camelcase */
import Express from 'express'

import validator from '../../utils/validator'
import UserRepo from '../../database/UserRepo'
import { compare } from '../../utils/getHash'
import { SuccessAuthorization, BadRequestError } from '../../core/ApiResponse'
import { signJwt } from '../../utils/jwt'
import schema from './schema'

const router = Express.Router()

const signin = router.post('/signin', validator(schema.signin), async (req, res) => {
  try {
    const { id, password } = req.body

    const user = await UserRepo.getUserById({ id })

    const isAuthorized = await compare({ textPassword: password, hash: user.password })

    if (isAuthorized) {
      const newSerial = user.serial + 1
      await UserRepo.updateUser({ id, serial: newSerial })

      const access_token = signJwt(user.id, newSerial, 10)
      const refresh_token = signJwt(user.id, newSerial, 30, 'refresh')

      new SuccessAuthorization({
        access_token,
        refresh_token,
      }).send(res)
    } else {
      new BadRequestError('wrong password').send(res)
    }
  } catch (err) {
    new BadRequestError('account does not exist').send(res)
  }
})

export default signin
