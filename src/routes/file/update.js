import Express from 'express'
import multer from 'multer'

import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import FilesRepo from '../../database/FilesRepo'
import auth from '../../utils/auth'
import validator from '../../utils/validator'
import schema from '../access/schema'

const router = Express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadFile = multer({ storage })

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
      new BadRequestError('error').send(res)
    }
  },
)

export default update
