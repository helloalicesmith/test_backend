import { connection } from '../server.js'

class FilesRepo {
  static createFile({ name, extension, mime, size, date }) {
    return new Promise((res, rej) => {
      connection.query(
        'INSERT INTO table_files(name, extension, mime, size, date) VALUES (?, ?, ?, ?, ?)',
        [name, extension, mime, size, date],
        (err, result) => {
          if (err) {
            rej(err)
          } else {
            res(result)
          }
        },
      )
    })
  }

  static getByPagination({ page, listSize }) {
    return new Promise((res, rej) => {
      connection.query('SELECT * FROM table_files LIMIT ?, ?', [page, listSize], (err, result) => {
        if (err) {
          rej(err)
        } else {
          res(result)
        }
      })
    })
  }

  static deleteFile({ id }) {
    return new Promise((res, rej) => {
      connection.query('DELETE FROM table_files WHERE id=?', [id], (err, result) => {
        if (err) {
          rej(err)
        } else {
          res(result)
        }
      })
    })
  }

  static getFilebyId({ id }) {
    return new Promise((res, rej) => {
      connection.query('SELECT * FROM table_files WHERE id=?', [id], (err, result) => {
        if (err) {
          rej(err)
        } else {
          res(result)
        }
      })
    })
  }
  static updateFileById({ name, extension, mime, size, date, id }) {
    return new Promise((res, rej) => {
      connection.query(
        'UPDATE table_files SET name=?, extension=?, mime=?, size=?, date=? WHERE id=?',
        [name, extension, mime, size, date, id],
        (err, result) => {
          if (err) {
            rej(err)
          } else {
            res(result)
          }
        },
      )
    })
  }
}

export default FilesRepo
