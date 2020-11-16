import Express from 'express'

import validator from '../../utils/validator.js'
import { AuthFailureResponse, SuccessResponse } from '../../core/ApiResponse.js'
import ServiceDB from '../../database/UserRepo.js'
import { getHash } from '../../utils/getHash.js'
import schema from './schema.js'

const router = Express.Router()

const signup = router.post('/signup', validator(schema.signup), async (req, res) => {
  try {
    const { id, password } = req.body

    const hash = await getHash({
      textPassword: password,
      saltRounds: 10,
    })

    await ServiceDB.createUser({
      id,
      password: hash,
    })

    new SuccessResponse('account created').send(res)
  } catch (err) {
    new AuthFailureResponse().send(res)
  }
})

export default signup
