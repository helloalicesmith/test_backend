import jwt from 'jsonwebtoken'

export const signJwt = (id, serial, expiresIn, token = 'access') =>
  jwt.sign(
    {
      id,
      serial,
      token,
    },
    process.env.SECRETJWT,
    { expiresIn: `${expiresIn}m` },
  )

export const decodedJwt = token => jwt.verify(token, process.env.SECRETJWT)
