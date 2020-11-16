import { BadRequestError } from '../core/ApiResponse.js'
import { decodedJwt } from './jwt.js'
import UserRepo from '../database/UserRepo.js'

export default async (req, res, next) => {
  try {
    const { id, serial, token } = decodedJwt(req.headers.authorization.split(' ')[1])

    const user = await UserRepo.getUserById({ id })

    if (token === 'access' && user.serial === serial) {
      next()
    } else {
      next(new BadRequestError('invalid token').send(res))
    }
  } catch (error) {
    next(new BadRequestError('invalid token').send(res))
  }
}
