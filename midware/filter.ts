import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import auth from 'http-auth'
import config from '../config'

const basic = auth.basic({
    realm: 'Http Auth Realm',
}, (username: string, password: string, cb: Function) => {
    cb(username === config.HTTP_AUTH.USERNAME && password === config.HTTP_AUTH.PASSWORD)
})

export default (req: Request, res: Response, next: Function) => {
    // 1. intercept request on favicon.ico
    if (req.path === '/favicon.ico') {
        return res.status(204).end()
    }

    // 2. apply http auth to log accessing
    if (config.HTTP_AUTH.ITEMS_REG.test(req.path)) {
        return basic.check(req, res, (request: Request, response: Response, err: Error) => {
            if (err) {
                return next(err)
            }

            if (/\.log$/.test(request.url)) {
                const logPath = path.resolve(config.API_LOG_PATH, request.url.substr(1))
                return fs.createReadStream(logPath).pipe(res)
            }

            next()
        })
    }

    next()
}
