import Express from 'express'

import validator from '../../utils/validator'
import { AuthFailureResponse, SuccessAuthorization } from '../../core/ApiResponse'
import ServiceDB from '../../database/UserRepo'
import schema from './schema'
import { signJwt, decodedJwt } from '../../utils/jwt'

const router = Express.Router()

const newToken = router.post('/signin/new_token', validator(schema.auth, 'headers'), async (req, res) => {
  try {
    const { authorization } = req.headers

    const { id, serial, token } = decodedJwt(authorization.split(' ')[1])

    const user = await ServiceDB.getUserById({ id })

    if (token === 'access' || serial !== user.serial) {
      new AuthFailureResponse('invalid token', null).send(res)
    } else {
      const newSerial = user.serial + 1
      await ServiceDB.updateUser({ id, serial: newSerial })

      // eslint-disable-next-line camelcase
      const access_token = signJwt(id, newSerial, 10)
      // eslint-disable-next-line camelcase
      const refresh_token = signJwt(id, newSerial, 30, 'refresh')

      new SuccessAuthorization({
        access_token,
        refresh_token,
      }).send(res)
    }
  } catch (err) {
    new AuthFailureResponse('error', null).send(res)
  }
})

export default newToken
