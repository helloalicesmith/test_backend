import accessRoutes from './access'
import filesRoutes from './file'

import info from './info/info'

export default [info, ...accessRoutes, ...filesRoutes]
