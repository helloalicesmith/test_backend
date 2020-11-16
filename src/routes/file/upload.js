import Express from 'express'
import multer from 'multer'

import { nanoid } from 'nanoid'
import validator from '../../utils/validator'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import FilesRepo from '../../database/FilesRepo'
import schema from '../access/schema'
import auth from '../../utils/auth'

const router = Express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${nanoid()}-${file.originalname}`)
  },
})

const uploadFile = multer({ storage })

const upload = router.post(
  '/file/upload',
  validator(schema.auth, 'headers'),
  auth,
  uploadFile.any('file'),
  async (req, res) => {
    try {
      const [file] = req.files

      const [filename, extension] = file.filename.split('.')

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
