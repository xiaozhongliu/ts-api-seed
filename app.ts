import 'source-map-support/register'

import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import expressValidator from 'express-validator'
import {
    filter,
    monitor,
    httplog,
    cors,
    auth,
} from './midware'
import { toolset, customValidators } from './util'
import { errorlogCtrl } from './ctrl'
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
app.use(router)

app.use((req: Request, res: Response, next: Function) => {
    next(toolset.messageErr('NotFound', req.url))
})

// eslint-disable-next-line
app.use(({ code = -1, message, stack }: Error, req: Request, res: Response, next: Function) => {
    res.fail(code, message)
    if (code === -1) console.log(stack)
    if (code > 10001 || req.method === 'OPTIONS') return
    errorlogCtrl.createErrorLog(req, code, message, stack)
})

app.listen(config.API_PORT)

process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection: ', err)
})
