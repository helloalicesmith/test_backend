import signup from './access/signup'
import signin from './access/signin'
import newToken from './access/newToken'
import logout from './access/logout'

import upload from './file/upload'
import list from './file/list'
import deleteFile from './file/delete'
import file from './file/file'
import download from './file/download'
import update from './file/update'
import info from './info/info'

const routes = [signup, signin, newToken, upload, list, deleteFile, file, download, update, info, logout]

export default routes
