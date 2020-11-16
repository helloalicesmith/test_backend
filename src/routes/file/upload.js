import Express from 'express'
import multer from 'multer'

import validator from '../../utils/validator.js'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import schema from '../access/schema.js'
import auth from '../../utils/auth.js'

const router = Express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadFile = multer({ storage: storage })

const upload = router.post(
  '/file/upload',
  validator(schema.auth, 'headers'),
  auth,
  uploadFile.any('file'),
  async (req, res) => {
    try {
      const [file] = req.files

      const [filename, extension] = file.originalname.split('.')

      const data = {
        name: filename,
        extension,
        mime: file.mimetype,
        size: file.size,
        date: new Date().toISOString(),
      }

      await FilesRepo.createFile(data)
      new SuccessResponse('file saved').send(res)
    } catch (err) {
      new BadRequestError('error').send(res)
    }
  },
)

export default upload
