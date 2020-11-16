import fs from 'fs'

const getFiles = path =>
  new Promise((resolve, reject) =>
    fs.readdir(path, (err, filenames) => (err != null ? reject(err) : resolve(filenames))),
  )

export default getFiles
