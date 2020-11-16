import signup from './access/signup.js'
import signin from './access/signin.js'
import newToken from './access/newToken.js'
import logout from './access/logout.js'

import upload from './file/upload.js'
import list from './file/list.js'
import deleteFile from './file/delete.js'
import file from './file/file.js'
import download from './file/download.js'
import update from './file/update.js'
import info from './info/info.js'

const routes = [signup, signin, newToken, upload, list, deleteFile, file, download, update, info, logout]

export default routes
