import Joi from '@hapi/joi'

export default {
  signup: Joi.object().keys({
    id: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
  }),
  signin: Joi.object().keys({
    id: Joi.string().required().min(3),
    password: Joi.string().required().min(6),
  }),
  auth: Joi.object()
    .keys({
      authorization: Joi.string()
        .custom((value, helpers) => {
          if (!value.startsWith('Bearer ')) return helpers.error('any.invalid')
          if (!value.split(' ')[1]) return helpers.error('any.invalid')
          return value
        }, 'Authorization Header Validation')
        .required(),
    })
    .unknown(true),
}
