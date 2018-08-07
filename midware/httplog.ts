import express, { Request, Response } from 'express'
import shortid from 'shortid'
import config from '../config'
import { logger } from '../util'

logger = logger(config.API_LOG_PATH)

// add a logging aspect to the primary res.json function
const origin = express.response.json
express.response.json = function (json: Object) {
    logger.info(`[${this.reqId}] Resp  `, JSON.stringify(json))
    return origin.call(this, json)
}

logger.info(`service starts at http://localhost:${config.API_PORT}\n`)

export default (req: Request, res: Response, next: Function) => {
    if (config.NO_AUTH_REG.test(req.url) || req.method === 'OPTIONS') {
        return next()
    }

    res.start = new Date().getTime()
    res.reqId = shortid.generate()

    logger.info(`[${res.reqId}] Start `, req.method, req.url)
    if (req.method !== 'GET') {
        logger.info(`[${res.reqId}] Data  `, JSON.stringify(req.body))
    }

    res.on('finish', function () {
        const duration = new Date().getTime() - this.start
        logger.info(`[${this.reqId}] Done  `, this.statusCode, `(${duration}ms)\n`)
    })

    next()
}
