if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev'
// use same root directory for node and ts-node
global.rootdir = __dirname.replace('/dist', '')

import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import express, { Request, Response } from 'express'
import {
    filter,
    monitor,
    httplog,
    cors,
    auth,
} from './midware'
import { toolset, customValidators } from './util'
import { errorlogSvc } from './service'
import router from './router'
import config from './config'

const app = express()
app.get('*', filter)
app.use(monitor)
app.use(bodyParser.json())
app.use(bodyParser.text({ type: '*/xml' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator({ customValidators }))

app.use(httplog)
app.use(cors)
app.use(auth)
app.use(`/${config.API_NAME}`, router)

app.use((req: Request, res: Response, next: Function) => {
    next(toolset.messageErr('NotFound', req.url))
})

app.use(({ code = -1, message, stack }: Error, req: Request, res: Response, next: Function) => {
    res.fail(code, message)
    if (code === -1) console.log(stack)
    if (code > 10001 || req.method === 'OPTIONS') return
    errorlogSvc.createErrorLog(req, code, message, stack)
})

// use a different port for unittests from the running api
const isInUnitTest = process.argv[1].includes('jest')
const port = isInUnitTest ? 9999 : config.API_PORT
app.listen(port)

process.on('unhandledRejection', err => {
    console.log('unhandled rejection:', err)
})

export default app
