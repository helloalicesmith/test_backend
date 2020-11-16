import { BadRequestError } from '../core/ApiResponse.js'

export default (schema, source = 'body') => (req, res, next) => {
  try {
    const { error } = schema.validate(req[source])

    if (!error) return next()

    const { details } = error

    next(new BadRequestError(details[0].message).send(res))
  } catch (error) {
    next(error)
  }
}
