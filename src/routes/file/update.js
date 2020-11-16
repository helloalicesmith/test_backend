import Express from 'express'
import multer from 'multer'

import { BadRequestError, SuccessResponse } from '../../core/ApiResponse.js'
import FilesRepo from '../../database/FilesRepo.js'
import auth from '../../utils/auth.js'
import validator from '../../utils/validator.js'
import schema from '../access/schema.js'

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

const update = router.put(
  '/file/update/:id',
  validator(schema.auth, 'headers'),
  auth,
  uploadFile.any('file'),
  async (req, res) => {
    try {
      const { id } = req.params
      const [file] = req.files

      const [filename, extension] = file.originalname.split('.')

      const data = {
        name: filename,
        extension,
        mime: file.mimetype,
        size: file.size,
        date: new Date().toISOString(),
        id,
      }

      await FilesRepo.updateFileById(data)
      new SuccessResponse('file updated').send(res)
    } catch (err) {
      console.log(err)
      new BadRequestError('error').send(res)
    }
  },
)

export default update
