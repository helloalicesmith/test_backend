import bcrypt from 'bcrypt'

export const getHash = async ({ textPassword, saltRounds }) => {
  const hash = await bcrypt.hash(textPassword, saltRounds)

  return hash
}

export const compare = async ({ textPassword, hash }) => {
  const isCompare = await bcrypt.compare(textPassword, hash)

  return isCompare
}
