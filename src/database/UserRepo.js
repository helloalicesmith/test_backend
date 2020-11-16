import connection from './index'

class ServiceDB {
  static createUser({ id, password }) {
    return new Promise((res, rej) => {
      connection.query(
        'INSERT INTO table_users(id, password, serial) VALUES (?, ?, ?)',
        [id, password, 1],
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

  static getUserById({ id }) {
    return new Promise((res, rej) => {
      connection.query('SELECT * FROM table_users WHERE id=?', [id], (err, result) => {
        if (err) {
          rej(err)
        } else {
          res(result[0])
        }
      })
    })
  }

  static updateUser({ id, serial }) {
    return new Promise((res, rej) => {
      connection.query('UPDATE table_users SET serial=? WHERE id=?', [serial, id], (err, result) => {
        if (err) {
          rej(err)
        } else {
          res(result)
        }
      })
    })
  }
}

export default ServiceDB
