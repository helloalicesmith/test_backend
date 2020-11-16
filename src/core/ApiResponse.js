class ApiResponse {
  constructor(status, message, info, data) {
    this.status = status
    this.message = message
    this.info = info
    this.data = data
  }

  send(res) {
    const data = {
      message: this.message,
      info: this.info,
      data: this.data,
    }

    return res.status(this.status).json(ApiResponse.filterData(data))
  }

  static filterData(data) {
    return Object.keys(data)
      .filter(item => !!data[item])
      .reduce((acc, key) => {
        acc[key] = data[key]
        return acc
      }, {})
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure', info = 'This mail already exists') {
    super(401, message, info)
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(message, data = null) {
    super(200, message, null, data)
  }
}

export class BadRequestError extends ApiResponse {
  constructor(message) {
    super(400, message)
  }
}

export class SuccessAuthorization extends ApiResponse {
  constructor(data) {
    super(200, null, null, data)
  }
}
