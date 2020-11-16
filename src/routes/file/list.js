import Express from 'express'

import validator from '../../utils/validator'
import { BadRequestError, SuccessResponse } from '../../core/ApiResponse'
import FilesRepo from '../../database/FilesRepo'
import schema from '../access/schema'
import auth from '../../utils/auth'
import getFiles from '../../utils/getFiles'

const router = Express.Router()

const list = router.get('/file/list', validator(schema.auth, 'headers'), auth, async (req, res) => {
  try {
    const page = +req.query.page || 1
    const listSize = +req.query.list_size || 10

    const offset = page * listSize - listSize

    const currentFiles = await FilesRepo.getByPagination({ page: offset, listSize })

    const data = async () => {
      const files = await getFiles('uploads')

      return currentFiles.map(currentFile => {
        const fullFileName = `${currentFile.name}.${currentFile.extension}`
        const linkFile = `http://localhost:3333/${fullFileName}`

        if (files.includes(fullFileName)) {
          return {
            ...currentFile,
            file: linkFile,
          }
        }

        return currentFiles
      })
    }

    new SuccessResponse(null, await data()).send(res)
  } catch (err) {
    new BadRequestError('error').send(res)
  }
})

export default list
