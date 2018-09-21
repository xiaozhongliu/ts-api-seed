if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'
// use same root directory for node and ts-node
global.rootdir = __dirname.replace('/dist', '')

import Koa from 'koa'
import koaBody from 'koa-body'
import config from './config'
import router from './router'
import { extender } from './util'
import { commonCtrl } from './ctrl'
import {
    auth,
    httplog,
    validate,
} from './midware'

const app = new Koa()
extender(app)
app.use(koaBody())
app.use(commonCtrl.bodyMounter)
app.use(commonCtrl.errorHandler)

app.use(auth)
app.use(httplog)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(config.API_PORT)
