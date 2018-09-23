if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'
// use same root directory for node and ts-node
global.rootdir = __dirname.replace('/dist', '')

import Koa from 'koa'
import koaBody from 'koa-body'
import validate from 'koa-validate'
import router from './router'
import config from './config'
import { extender } from './util'
import {
    bodyMounter,
    errorHandler,
    auth,
    httplog,
} from './midware'

const app = new Koa()
validate(app)
extender(app)
app.use(koaBody())
app.use(bodyMounter)
app.use(errorHandler)
app.use(auth)
app.use(httplog)
app.use(router.routes())
app.use(router.allowedMethods())

// use a different port for unittests from the running api
const isInUnitTest = process.argv[1].includes('jest')
const port = isInUnitTest ? 9999 : config.API_PORT
const server = app.listen(port)

export default server
