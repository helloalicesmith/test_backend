import { BadRequestError } from '../core/ApiResponse'

export default (schema, source = 'body') => (req, res, next) => {
  try {
    const { error } = schema.validate(req[source])

    if (!error) return next()

    const { details } = error

    return next(new BadRequestError(details[0].message).send(res))
  } catch (error) {
    return next(error)
  }
}
