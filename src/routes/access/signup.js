import Express from 'express'

import validator from '../../utils/validator'
import { AuthFailureResponse, SuccessResponse } from '../../core/ApiResponse'
import UserRepo from '../../database/UserRepo'
import { getHash } from '../../utils/getHash'
import schema from './schema'

const router = Express.Router()

const signup = router.post('/signup', validator(schema.signup), async (req, res) => {
  try {
    const { id, password } = req.body

    const hash = await getHash({
      textPassword: password,
      saltRounds: 10,
    })

    await UserRepo.createUser({
      id,
      password: hash,
    })

    new SuccessResponse('account created').send(res)
  } catch (err) {
    new AuthFailureResponse().send(res)
  }
})

export default signup
